const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');

//for security
const mongoSantize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const { NODE_ENV, NEW_PORT } = require('./config/dev');


//App Routes

const authRoutes = require('./route/auth');
const studentRoute = require('./route/student');
const dueRoute = require('./route/due');
const feedbackRoute = require('./route/feedback');

//colors for console
require('colors');

//connect to MongoDB
connectDB();

const app = express();

//Dev Logging Middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//init middleware-substitute for body-parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//sanitize data
app.use(mongoSantize());

//set security headers
app.use(helmet({ contentSecurityPolicy: false }));

//prevent xss attacks
app.use(xss());

//fileupload
app.use(fileupload());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 mins
//   max: 50,
// });
// app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

//routes
app.use('/auth', authRoutes);
app.use('/student', studentRoute);
app.use('/due', dueRoute);
app.use('/feedback', feedbackRoute);

//deploy
if (NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

//errorHandler
app.use(require('./middleware/error'));

//Server listening on PORT
const PORT = NEW_PORT || 5000;

// app.listen(PORT, () =>
//   console.log(`Server Started on Port ${PORT}`.yellow.bold)
// );

// Handle unhandled promise rejectio  ns
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  //server.close(() => process.exit(1));
});

exports.app = functions.https.onRequest(app);
