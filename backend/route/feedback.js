const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAllFeedbacks,
  getAllQues,
  submitFeedback,
  getData,
} = require('../controller/feedback');

//get all questions
router.get('/get-all-ques', getAllQues);
//get all students details
router.get('/get-all-feedbacks', getAllFeedbacks);
//post a student feedback
router.post('/submit-feedback', protect, submitFeedback);

router.get('/get-data', getData);

module.exports = router;
