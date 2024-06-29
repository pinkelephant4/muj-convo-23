const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const questions = require('../utils/feedback-questions');
const Feedback = require('../model/Feedback');
const Student = require('../model/student');

// @desc      get all questions
// @route     POST /api/v1/feedback/get-all-ques
// @access    Private
exports.getAllQues = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: questions,
  });
});

// @desc      get all records
// @route     POST /api/v1/feedback/get-all-feedbacks
// @access    Private
exports.getAllFeedbacks = asyncHandler(async (req, res, next) => {
  const feedbacks = await Feedback.find().populate('student');

  res.status(200).json({
    success: true,
    data: feedbacks,
  });
});

// @desc      Post a feedback
// @route     POST /api/v1/feedback/submit-feedback
// @access    Private
exports.submitFeedback = asyncHandler(async (req, res, next) => {
  let feedback = await Feedback.findOne({
    student: req.user._id,
  });
  const student = await Student.findById(req.user._id);

  if (feedback)
    return next(new ErrorResponse('Feedback already submitted', 400));

  feedback = await Feedback.create({
    student: req.user._id,
    details: req.body.details,
  });

  student.feedbackGiven = true;
  await student.save();

  res.status(200).json({
    success: true,
    data: feedback,
  });
});

exports.getData = asyncHandler(async (req, res, next) => {
  const ONE = ['Poor', 'Never', 'Unable to', 'Not at all', 'Strongly disagree'];
  const TWO = [
    'Disagree',
    'Average',
    'Very little',
    'Rarely',
    'Slightly',
    'Fair',
  ];
  const THREE = ['Neutral', 'Good', 'Somewhat', 'Sometimes', 'Partially'];
  const FOUR = ['Very Good', 'Usually', 'Reasonably', 'Moderate', 'Agree'];
  const FIVE = [
    'Strongly agree',
    'Outstanding',
    'To a great extent',
    'Every Time',
    'Fully',
  ];

  const feedbacks = await Feedback.find({}).populate('student');
  const finalFeedback = [];
  feedbacks.forEach((f) => {
    const questions = f.details.filter((q) => q.type === 'radio');
    let data = {
      student_name: f.student.student_name,
      reg_no: f.student.reg_no,
      email: f.student.email,
      faculty: f.student.faculty,
      school: f.student.school,
      programme: f.student.programme,
      score: 0,
      // score: avg,
      // total: total,
      // length: questions.length,
    };
    let total = 0,
      avg;
    questions.forEach((q) => {
      if (ONE.includes(q.ans)) {
        total += 1;
        data[q.ques] = 1;
      }
      if (TWO.includes(q.ans)) {
        total += 2;
        data[q.ques] = 2;
      }
      if (THREE.includes(q.ans)) {
        total += 3;
        data[q.ques] = 3;
      }
      if (FOUR.includes(q.ans)) {
        total += 4;
        data[q.ques] = 4;
      }
      if (FIVE.includes(q.ans)) {
        total += 5;
        data[q.ques] = 5;
      }

      avg = Math.floor(total / questions.length);
    });
    data['score'] = avg;

    finalFeedback.push(data);
  });

  res.status(200).json({
    success: true,
    data: finalFeedback,
    length: finalFeedback.length,
  });
});
