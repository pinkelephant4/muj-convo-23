// const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Student = require('../model/student');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');
const Due = require('../model/due');
const Department = require('../model/department');
const { JWT_COOKIE_EXPIRE } = require('../config/dev');
const { dueTemplate } = require('../utils/template/dueTemplate');
const { afterConvocationTemplate } = require('../utils/template/afterConvocationTemplate');
const {
  credentialsTemplate,
} = require('../utils/template/credentialsTemplate');

// @desc register user
// @route POST /auth/register
// @access PUBLIC

module.exports.registerUser = asyncHandler(async (req, res, next) => {
  try {
    const role = req.body.role;
    let user;
    if (role === 'student') {
      const { reg_no } = req.body;
      user = await Student.findOne({ reg_no });
      if (!user) {
        next(new ErrorResponse('No student found', 404));
      }
      if (user && user.password) {
        next(new ErrorResponse('This user already exists, please login', 404));
      } else {
        const genreatedPassword = crypto.randomBytes(3).toString('hex');

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(genreatedPassword, salt);

        // await user.save();

        const message = `Your password for login is ${genreatedPassword}`;
        const html = await credentialsTemplate(
          reg_no,
          genreatedPassword,
          false
        );
        try {
          await sendEmail({
            email: user.email,
            subject: 'Your password',
            message,
            html,
          });
          await user.save();
        } catch (error) {
          next(new ErrorResponse('Email could not be sent', 500));
        }
      }
    } else if (role === 'department') {
      const { email, department, password, role } = req.body;
      user = await Department.create({ email, department, password, role });

      // user = await Student.findOne({ reg_no });
      // if (!user) {
      //   next(new ErrorResponse('No department found', 404));
      // }
      const message = `Your password for login is ${password}`;
      const html = await credentialsTemplate(email, password, true);
      await sendEmail({
        email: user.email,
        subject: 'Your password',
        message,
        html,
      });
    } else if (role === 'admin') {
      const { email, department, password, role } = req.body;
      user = await Department.create({ email, department, password, role });

      // user = await Student.findOne({ reg_no });
      // if (!user) {
      //   next(new ErrorResponse('No department found', 404));
      // }
      const message = `Your password for login is ${password}`;
      const html = await credentialsTemplate(email, password, true);
      await sendEmail({
        email: user.email,
        subject: 'Your password',
        message,
        html,
      });
    }
    sendTokenResponse(user, 200, res);
    // const user = await User.create({
    //   name,
    //   email,
    //   password,
    //   role,
    // });
  } catch (err) {
    console.log(err);
  }
});

// @desc register user
// @route POST /auth/login
// @access PUBLIC

module.exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    let matchingPassword;
    const role = req.body.role;
    let user;
    if (role === 'student') {
      const { reg_no, password } = req.body;
      // Validate regNo & password
      if (!reg_no || !password) {
        return next(
          new ErrorResponse(
            'Please provide a Registration No. and password',
            400
          )
        );
      }
      user = await Student.findOne({
        reg_no,
      }).select('+password');
      matchingPassword = password;
    } else if (role === 'department') {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          new ErrorResponse(
            'Please provide a Registration No. and password',
            400
          )
        );
      }

      user = await Department.findOne({ email }).select('+password');
      matchingPassword = password;
    } else {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          new ErrorResponse('Please provide an reg_no and password', 400)
        );
      }

      user = await Department.findOne({ email }).select('+password');
      matchingPassword = password;
    }

    if (!user) {
      return next(
        new ErrorResponse('User does not exist or invalid credentials!', 401)
      );
    }

    if (!user.password) {
      return next(
        new ErrorResponse('Please signup first to get your password!', 401)
      );
    }

    // *

    // Check if password matches
    const isMatch = await user.matchPassword(matchingPassword);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    if (user.role === 'student') {
      const { reg_no } = req.body;
      const dues = await Due.find({ reg_no, is_clear: false });

      const html = dueTemplate(dues);

      const message = `Your dues`;

      if (dues.length > 0) {
        await sendEmail({
          email: user.email,
          subject: 'Your Dues',
          message,
          html,
        });
        return next(
          new ErrorResponse(
            'Please clear your dues first. Check your mail for due details ',
            401
          )
        );
      }
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.log(err);
  }
});

// @desc get user after login
// @route GET /auth/getUser
// access PRIVATE

exports.getUserAfterLogin = asyncHandler(async (req, res, next) => {
  // getting user based on id of jwt token from header and as we don't want password we neglect it  using select('-password')
  let user;
  let student = await Student.findById(req.user._id);
  let department = await Department.findById(req.user._id);
  if (student) {
    user = student;
  } else if (department) {
    user = department;
  }

  if (!user) {
    next(new ErrorResponse('User not found!', 404));
  }
  res.status(200).json({ success: true, data: user });
});

// @desc      add communication data
// @route     post /auth/add-communication-data
// @access    Private
exports.addCommunicationData = asyncHandler(async (req, res, next) => {
  const user = await Student.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    next(new ErrorResponse('User not found!', 404));
  }
  res.status(200).json({ success: true, data: user });
});

// @desc      Log user out / clear cookie
// @route     GET /logout
// @access    Public

exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    msg: 'successfully logged out!',
  });
});

// @desc      Update user details
// @route     PUT /auth/updateDetails
// @access    Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  const fields = { name, email };

  const students = await Student.find({ day: req.body.day });
  if (students.length > 0) {
    return next(new ErrorResponse('Maximum students for that day is 1', 400));
  }

  const user = await User.findByIdAndUpdate(req.user._id, fields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update password
// @route     PUT /auth/updatePassword
// @access    Private

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  let user = await User.findById(req.user._id).select('+password');

  if (!user) {
    throw new ErrorResponse(
      'User does not exist, please logout and login again!',
      404
    );
  }

  const isMatch = await user.matchPassword(currentPassword);

  // Check current password

  if (!isMatch) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = newPassword;

  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Forgot password
// @route     POST /auth/forgotpassword
// @access    Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/auth/resetpassword/${resetToken}`;
  // const resetUrl = `${req.protocol}://localhost:3000/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please visit this link to reset password: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({ success: true, data: 'Email sent', resetUrl });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent!', 500));
  }
});

// @desc      Reset password
// @route     PUT /auth/resetpassword/:resetToken
// @access    Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;

  const { resetToken } = req.params;

  // Get hashed token

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});

exports.sendConfirmationEmail = asyncHandler(async (req, res, next) => {
  // // const { email } = req.body;

  //changes
  // const message = `You have selected the option to collect the degree certificate in person, thereby you don't need to pay anything and your registration for 9th MUJ Convocation is successful. Please do not login again.`;
  // await sendEmail({
  //   email: req.user.email,
  //   subject: 'Registration successful',
  //   message,
  // });
  // res.status(200).json({
  //   success: true,
  // });

  const html = await credentialsTemplate()
  const message = `You have selected the option to collect the degree certificate in person, thereby you don't need to pay anything and your registration for 10th MUJ Convocation is successful. Please do not login again.`;
  await sendEmail({
    email: req.user.email,
    subject: 'Registration successful',
    message,
    html
  });
  res.status(200).json({
    success: true,
  });
});


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
