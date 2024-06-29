const { validationResult } = require('express-validator');
const asyncHandler = require('../middleware/async');
const Due = require('../model/due');
const ErrorResponse = require('../utils/errorResponse');
const Student = require('../model/student');

exports.getDueByRegNo = asyncHandler(async (req, res, next) => {
  const reg_no = req.params.id;
  const department = req.user.department;
  const dues = await Due.find({
    reg_no: reg_no,
    department: department,
  });

  res.status(200).json({
    message: 'Student Dues are: ',
    data: dues,
  });
});

exports.createStudentDue = asyncHandler(async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const error = new Error('Validation failed, entered data is incorrect.');
    //   error.statusCode = 422;
    //   error.data = errors.array();
    //   throw error;
    // }
    const { reg_no, department, amount_due, details } = req.body;
    const due = await Due.create({
      reg_no,
      department,
      amount_due,
      details,
    });

    //  await due
    //     .save()
    //     .then((result) => {
    res.status(200).json({
      message: 'Student Due created successfully',
      data: due,
    });
    // })
    // .catch((error) => {
    //   if (!error.statusCode) {
    //     error.statusCode = 500;
    //   }
    //   next(error);
    // });
  } catch (err) {
    console.log(err);
  }
});

exports.deleteStudentByRegAndDept = asyncHandler(async (req, res, next) => {
  const { reg_no } = req.body;
  const department = req.user.department;
  // Due.find({ reg_no, department })
  //   .then((result) => {
  //     if (!result) {
  //       const error = new Error('Could not find student.');
  //       error.status = 404;
  //       throw error;
  //     } else {
  //       // return Due.findByIdAndRemove(result[0]._id);
  //       return Due.deleteMany({ reg_no, department });
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
  const dues = await Due.find({
    reg_no,
    department,
  });

  if (!dues) {
    return next(new ErrorResponse('Could not find student dues', 404));
  }

  await Due.deleteMany({ reg_no, department });

  res.status(200).json({
    message: 'Deleted student dues successfully',
  });
});

exports.clearStudentDue = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let due = await Due.findById(id);

  if (!due) {
    return next(new ErrorResponse('Could not find due', 404));
  }
  due = await Due.findByIdAndUpdate(id, {
    is_clear: true,
  });

  res.status(200).json({
    message: 'Student due cleared successfully!',
    student: due,
  });

  // Due.findById(id)
  //   .then((student) => {
  //     if (!student) {
  //       const error = new Error('Could not find student.');
  //       error.status = 404;
  //       throw error;
  //     }
  //     return Due.findByIdAndUpdate(id, { is_clear: true });
  //     // student.is_clear = true;
  //     // return student.save();
  //   })
  //   .then((result) => {
  //     res.status(200).json({
  //       message: 'Student due cleared successfully!',
  //       student: result,
  //     });
  //   })
  //   .catch((error) => {
  //     if (!error.statusCode) {
  //       error.statusCode = 500;
  //     }
  //     next(error);
  //   });
});
