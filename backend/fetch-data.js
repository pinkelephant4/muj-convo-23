const Student = require('./model/student');
const Feedback = require('./model/Feedback');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/dev');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

const fetchData = async () => {
  console.log('inside');
  try {
    const students = await Student.find();
    const feedbacks = await Feedback.find();

    console.log('out', feedbacks[0]);
  } catch (err) {
    console.error(err);
  }
};

fetchData();
