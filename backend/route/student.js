const express = require('express');
const Router = express.Router();
const studentController = require('../controller/student');
const { protect, authorize } = require('../middleware/auth');

Router.get(
  '/get-all-students',
  protect,
  authorize('department', 'admin'),
  studentController.getStudentsData
);
Router.post('/paymentResponse', studentController.getPaymentResponse);
Router.post('/payment/payumoney', studentController.paymentRequest);
Router.post('/getPaymentStatus', studentController.getPaymentStatus);
Router.get(
  '/get-specific-student/:id',
  protect,
  authorize('department', 'admin'),
  studentController.getSpecificStudent
);
Router.get(
  '/get-unpaid-students',
  protect,
  authorize('department', 'admin'),
  studentController.getUnpaidStudents
);
Router.post('/create-student', studentController.createStudent);
Router.post('/create-students', studentController.createStudents);
Router.post('/check-day', studentController.checkDay);
Router.post(
  '/send-email-after-save',
  studentController.sendEmailAfterSaveDetail
);
Router.put('/update-student/:id', studentController.updateStudent);
Router.put(
  '/update-student-payment-status/:id',
  studentController.updateStudentPaymentStatus
);

Router.put(
  '/update-registration-status',
  studentController.updateRegistrationStatus
);

Router.delete(
  '/delete-student-by-reg-no/:id',
  studentController.deleteStudentByRegNo
);

module.exports = Router;