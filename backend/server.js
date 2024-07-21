const functions = require('firebase-functions');
const axios = require('axios');
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
const { NODE_ENV } = require('./config/dev');

//App Routes
const authRoutes = require('./route/auth');

const studentRoute = require('./route/student');
const dueRoute = require('./route/due');
const feedbackRoute = require('./route/feedback');

//colors for console
require('colors');

//connect MongoDB
connectDB();

//App initialization
const app = express();

//Dev Logging Middleware
// if (NODE_ENV === 'development') {
app.use(morgan('dev'));
// }
//init middleware-substitute for body-parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//fileupload
app.use(fileupload());

//sanitize data
app.use(mongoSantize());

//set security headers
app.use(helmet({ contentSecurityPolicy: false }));

//prevent xss attacks
app.use(xss());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 mins
//   max: 100,
// });
// app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

app.use('/auth', authRoutes);
app.use('/student', studentRoute);
app.use('/due', dueRoute);
app.use('/feedback', feedbackRoute);

// app.use('/',(req,res)=>{res.send("all good")})

app.use(require('./middleware/error'));

app.post('/getPaymentStatus', (req, res) => {
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

let port = 5001;

const server = app.listen(port, () =>
  console.log(`Server Started on Port ${port}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  //server.close(() => process.exit(1));
});

// exports.app = functions.https.onRequest(app);
