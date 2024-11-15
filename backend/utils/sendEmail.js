const nodemailer = require('nodemailer');
const {
  //   SMTP_EMAIL,
  //   SMTP_HOST,
  //   SMTP_PASSWORD,
  //   SMTP_PORT,
  FROM_EMAIL,
  //   FROM_NAME,
  SENDGRID_API_KEY,
} = require('../config/dev');

// const sendEmail = async (options) => {
//   // create reusable transporter object using the default SMTP transport
//   //console.log(process.env);

//   let transporter = nodemailer.createTransport({
//     service: 'gmail',

//     host: SMTP_HOST,
//     port: SMTP_PORT,
//     secure: false,
//     auth: {
//       user: SMTP_EMAIL,
//       pass: SMTP_PASSWORD,
//     },
//   });

//   let message = {
//     from: `${FROM_NAME} <${FROM_EMAIL}>`,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   if (options.html) {
//     message.html = options.html;
//   }

//   const info = await transporter.sendMail(message);

//   console.log('Message sent: %s', info.messageId);
// };

// const sgMail = require('@sendgrid/mail');

// const sendEmail = async (options) => {
//   sgMail.setApiKey(SENDGRID_API_KEY);
//   const msg = {
//     to: options.email,
//     from: FROM_EMAIL, // Use the email address or domain you verified above
//     subject: options.subject,
//     text: options.message,
//     html: options.html,
//   };
//   //ES6
//   sgMail.send(msg).then(
//     () => {},
//     (error) => {
//       console.error(error);

//       if (error.response) {
//         console.error(error.response.body);
//       }
//     }
//   );
// };

const sendEmail = async (options) => {
  try {

    let transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'info@mujconvocation.in', // generated ethereal user
        // pass: 'Mujmuj@2020', // generated ethereal password
        pass: 'Mujmuj@2024', // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'info@mujconvocation.in', // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      text: options.message, // plain text body
      html: options.html, // html body
    });

  } catch (err) {
    throw new Error(err);
  }
};

module.exports = sendEmail;
