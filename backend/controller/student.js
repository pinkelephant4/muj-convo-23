const { validationResult } = require('express-validator');
const asyncHandler = require('../middleware/async');
const Student = require('../model/student');
const { inPersonTemplate } = require('../utils/template/inPersonTemplate');
const { courierTemplate } = require('../utils/template/courierTemplate');
const {
  afterConvocationTemplate,
} = require('../utils/template/afterConvocationTemplate');
const {
  PAYUMONEY_MERCHENT_KEY,
  PAYUMONEY_SALT_VALUE,
} = require('../config/dev');
const axios = require('axios');
const jsSHA = require('jssha');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

exports.getStudentsData = asyncHandler(async (req, res, next) => {
  // Student.find()
  //   .then((result) => {
  //     res.status(200).json({
  //       message: 'Students fetched',
  //       data: result,
  //     });
  //   })
  //   .catch((err) => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });
  const students = await Student.find();
  res.status(200).json({
    message: 'Students fetched',
    data: students,
  });
});

exports.getSpecificStudent = asyncHandler(async (req, res, next) => {
  const reg_no = req.params.id;
  const student = await Student.findOne({ reg_no: reg_no });

  if (!student) {
    return next(new ErrorResponse('No Student Found!', 404));
  }

  res.status(200).json({
    message: 'Student fetched',
    student,
  });
});

exports.checkDay = asyncHandler(async (req, res, next) => {
  const students = await Student.find({ day: req.body.day });
  if (students.length > 659) {
    return next(new ErrorResponse('Maximum students for that day is 700', 400));
  }
  res.status(200).send();
});

exports.paymentRequest = asyncHandler(async (req, res, next) => {
  try {
    if (
      !req.body.txnid ||
      !req.body.amount ||
      !req.body.productinfo ||
      !req.body.firstname ||
      !req.body.email
    ) {
      next(new ErrorResponse('Mandatory fields missing', 400));
    } else {
      const pd = req.body;
      const hashString =
        PAYUMONEY_MERCHENT_KEY + // Merchant Key
        '|' +
        pd.txnid +
        '|' +
        pd.amount +
        '|' +
        pd.productinfo +
        '|' +
        pd.firstname +
        '|' +
        pd.email +
        '|' +
        '||||||||||' +
        PAYUMONEY_SALT_VALUE; // Your salt value

      // var sha = new jsSHA('SHA-512', 'TEXT');
      const sha = crypto.createHash('sha512', 'text');
      sha.update(hashString);
      // sha.update(hashString);

      // var hash = sha.getHash('HEX');
      const hash = sha.digest('hex');

      res.status(200).json({
        success: true,
        hash: hash,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

exports.getPaymentResponse = asyncHandler((req, res, next) => {
  const pd = req.body;
  //Generate new Hash
  const hashString =
    PAYUMONEY_SALT_VALUE +
    '|' +
    pd.status +
    '||||||||||' +
    '|' +
    pd.email +
    '|' +
    pd.firstname +
    '|' +
    pd.productinfo +
    '|' +
    pd.amount +
    '|' +
    pd.txnid +
    '|' +
    PAYUMONEY_MERCHENT_KEY;

  // var sha = new jsSHA('SHA-512', 'TEXT');
  const sha = crypto.createHash('sha512', 'text');

  sha.update(hashString);

  // var hash = sha.getHash('HEX');
  const hash = sha.digest('hex');
  console.log(hash);
  console.log(pd.hash);
  // Verify the new hash with the hash value in response
  res.status(200).json({
    status: pd.status,
    success: true,
  });

  // if (hash == pd.hash) {
  //   console.log('success');
  // } else {
  //   console.log('fail');
  //   res.status(200).json({ status: false, success: false });
  // }
});

exports.getUnpaidStudents = asyncHandler(async (req, res, next) => {
  // Student.find({ is_paid: false })
  //   .then((result) => {
  //     if (!result) {
  //       const error = new Error('Could not find student');
  //       error.status = 404;
  //       throw error;
  //     }
  //     res.status(200).json({ message: 'Student fetched', student: result });
  //   })
  //   .catch((err) => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });
  const student = await Student.find({ is_paid: false });
  if (!student) {
    return next(new ErrorResponse('Could not find student', 404));
  }
  res.status(200).json({
    message: 'Student fetched',
    student: student,
  });
});

exports.updateRegistrationStatus = asyncHandler(async (req, res, next) => {
  // console.log('updateRegistrationStatus');
  const reg_no = req.body.reg_no;
  const companions = req.body.companions;
  const attending = req.body.attending;
  const date = req.body.date;

  if (date == "19th October") {
    return res.status(405).json({
      message: `Selected date not available`,
      student: student,
      reg_no,
      companions,
      attending
    });
  }
  const student = await Student.findOne({ reg_no });
  if (!student) {
    return next(new ErrorResponse('Could not find student', 404));
  }
  // console.log(reg_no, companions, attending, student);
  if (attending === "inPerson") {
    student.companions = companions;
    student.day = date;
  } else {
    student.companions = 'NA';
    student.day = 'NA';

  }
  await student.save();

  if (attending === "courier") {

    const message =
      'You have selected the option to collect the degree certificate through courier.';
    await sendEmail({
      email: student.email,
      subject: 'Convocation Registration-Payment Pending',
      message: message,
      html: courierTemplate(),

    });

  } else {
    //change date

    const message =
      `You have selected the option to collect the degree certificate in person on ${date} 2024 along with ${student.companions} companions. Thereby your registration for 11th MUJ Convocation is successful. Please do not login again.`;
    await sendEmail({
      email: student.email,
      subject: 'Registration Successful',
      message: message,
      html: inPersonTemplate(date, student.companions),
    });

  }

  res.status(200).json({
    message: `Student registration successful`,
    student: student,
    reg_no,
    companions,
    attending
  });

});

//TODO
exports.updateStudentPaymentStatus = asyncHandler(async (req, res, next) => {
  const reg_no = req.params.id;
  const paymentId = req.body.paymentId;
  const day = req.body.day;
  const companions = req.body.companions;
  const student = await Student.findOne({ reg_no });
  if (!student) {
    return next(new ErrorResponse('Could not find student', 404));
  }
  student.is_paid = true;
  student.paymentId = paymentId;
  if (day) {
    student.day = day;
    student.companions = companions;
  } else {
    student.day = 'NA';
    student.companions = 'NA';
  }
  await student.save();
  if (day === '') {
    const message =
      'You have selected the option to collect the degree certificate through courier.';
    await sendEmail({
      email: student.email,
      subject: 'Convocation Registration-Payment Pending',
      message: message,
      html: courierTemplate(),
    });
  } else {
    // if (req.body.companions) date = '25th November';
    // if (day === '2') date = '5th November';
    // if (day === '3') date = '6th November';
    let date = req.body.day;
    const message =
      `You have selected the option to collect the degree certificate in person on ${date} 2023 along with ${student.companions} companions. Thereby your registration for 10th MUJ Convocation is successful. Please do not login again.`;
    await sendEmail({
      email: student.email,
      subject: 'Registration Successful',
      message: message,
      html: inPersonTemplate(date, student.companions),
    });
  }
  res.status(200).send({
    message: 'Student paid successfully!',
    student: student,
  });
  // Student.find({ reg_no: reg_no })
  //   .then((student) => {
  //     if (student.length === 0) {
  //       const error = new Error('Could not find student.');
  //       error.status = 404;
  //       throw error;
  //     }
  //     student[0].is_paid = true;
  //     student[0].paymentId = paymentId;
  //     return student[0].save();
  //   })
  //   .then((result) => {
  //     res
  //       .status(200)
  //       .send({ message: 'Student paid successfully!', student: result });
  //   })
  //   .catch((error) => {
  //     if (!error.statusCode) {
  //       error.statusCode = 500;
  //     }
  //     next(error);
  //   });
});

//TODO
exports.createStudent = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const {
    faculty,
    school,
    programme,
    specialization,
    reg_no,
    student_name,
    gender,
    batch,
    credits,
    cgpa,
    remark,
  } = req.body;
  const student = new Student({
    faculty,
    school,
    programme,
    specialization,
    reg_no,
    student_name,
    gender,
    batch,
    credits,
    cgpa,
    remark,
  });
  student
    .save()
    .then((result) => {
      res
        .status(200)
        .json({ message: 'Student created successfully', data: result });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.sendEmailAfterSaveDetail = async (req, res, next) => {
  try {
    const message = 'Email is sent';
    const student = await Student.findOne({ reg_no: req.body.reg_no });
    await sendEmail({
      email: student.email,
      subject: 'Registration successful',
      message: message,
      html: afterConvocationTemplate(),
    });
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    next(error);
  }
};

//TODO
exports.updateStudent = (req, res, next) => {
  const reg_no = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const {
    faculty,
    school,
    programme,
    specialization,
    student_name,
    gender,
    batch,
    credits,
    cgpa,
    remark,
  } = req.body;
  Student.find({ reg_no: reg_no })
    .then((student) => {
      if (student.length == 0) {
        const error = new Error('Could not find student.');
        error.status = 404;
        throw error;
      }
      faculty ? (student[0].faculty = faculty) : '';
      school ? (student[0].school = school) : '';
      programme ? (student[0].programme = programme) : '';
      specialization ? (student[0].specialization = specialization) : '';
      student_name ? (student[0].student_name = student_name) : '';
      gender ? (student[0].gender = gender) : '';
      batch ? (student[0].batch = batch) : '';
      credits ? (student[0].credits = credits) : '';
      cgpa ? (student[0].cgpa = cgpa) : '';
      remark ? (student[0].remark = remark) : '';
      return student[0].save();
    })
    .then((result) => {
      res.status(200).send({
        message: 'Student details updated successfully!',
        student: result,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.createStudents = asyncHandler(async (req, res, next) => {
  const studentsData = req.body;
  const students = await Student.insertMany(studentsData);
  res.status(200).json({
    message: 'Students added',
    students: students,
  });
});

exports.deleteStudentByRegNo = asyncHandler(async (req, res, next) => {
  const reg_no = req.params.id;
  // Student.find({ reg_no: reg_no })
  //   .then((student) => {
  //     if (!student) {
  //       const error = new Error('Could not find student.');
  //       error.status = 404;
  //       throw error;
  //     } else {
  //       return Student.findByIdAndRemove(student[0]._id);
  //     }
  //   })
  //   .then((result) => {
  //     res.status(200).json({ message: 'Deleted student successfully!' });
  //   })
  //   .catch((err) => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });
  const student = await Student.findOne({ reg_no });

  if (!student) {
    return next(new ErrorResponse('Could not find student', 404));
  }
  await student.remove();

  res.status(200).json({
    message: 'Deleted student successfully!',
  });
});

exports.getPaymentStatus = asyncHandler(async (req, res, next) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://www.payumoney.com/payment/op/getPaymentResponse?merchantKey=kqfd6O&merchantTransactionIds=${req.body.mId}`,
    headers: {
      Authorization: 'zrOSMWWAUaRMPo3QOpZbouLZOyT/F0rz9wWYyM9MbVM=',
      Cookie:
        'ApplicationGatewayAffinity=b21c7619ecdd453eb569c03b1c71e43b; ApplicationGatewayAffinityCORS=b21c7619ecdd453eb569c03b1c71e43b; JSESSIONID=F3829EFF0FDF2C68E4FB0DF728DCAE8C',
    },
  };

  axios
    .request(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
