const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student reference is required'],
    },
    details: {
      type: [Object],
      required: [true, 'Feedback is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('feedback', FeedbackSchema);
