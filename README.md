
# MUJ Convocation Portal

Welcome to the official GitHub repository for the MUJ Convocation Portal. This project was developed, maintained, and handled for the 10th Convocation of Manipal University Jaipur to streamline the registrations and payments for over 2000 graduates.

## Features

- User Registration: Secure and straightforward registration process for students.
- Payment Gateway Integration: Easy and safe online payment process.
- Admin Panel: Manage registrations, payments, and generate reports.
- Email Notifications: Automated email confirmations and reminders.
- Responsive Design: Optimized for use on both desktop and mobile devices.
- Authentication and Authorization: Secure login and role-based access using JWT.
- Dues Collection: Efficient management of dues and payment statuses.
- Data Collection: Organized data management for registrations.
- Registration and Login: Secure registration and login functionality for users.
- Automated Emails: Sending passwords, payment confirmations, and other notifications to users automatically.
- Admin Portal for Dues Management: Admin can add student dues, which must be cleared before making a payment and registering for the convocation.
- Payment Integration: Seamless payment process using PayU API.

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Payment Gateway: PayU API
- Authentication and Authorization: JWT (JSON Web Tokens)
- Email Service: SendGrid
- Cloud Storage: Cloudinary
- Hosting: Firebase
- Other: Bootstrap, jQuery

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
```bash
  git clone https://github.com/pinkelephant4/muj-convo-23.git
```
2. Install dependencies:
```bash
  npm i 
```
3. Set up environment variables:
  Create a dev.js file in the config folder in the backend directory and add the following

```bash
module.exports = {
  NODE_ENV: 'development',
  NEW_PORT: 5000,
  MONGO_URI: 'your_mongodb_uri',
  JWT_SECRET: 'your_jwt_secret',
  JWT_COOKIE_EXPIRE: 100,
  SMTP_HOST: 'your-smtp-host',
  SMTP_PORT: '587',
  SMTP_EMAIL: 'your-email',
  FROM_EMAIL: 'your-email',
  FROM_NAME: 'MUJ Convocation',
  SMTP_PASSWORD: 'your-password',
  PAYUMONEY_MERCHENT_KEY: 'your_payu_key',
  PAYUMONEY_SALT_VALUE: 'your_payu_secret',
  SENDGRID_API_KEY: 'SendGrid-api-key', 
};

```
4. Run the application:
```bash
  npm run server
```
## Notes

- Ensure you have NodeJS installed on your system to run the project.


## Contributing

If you have any suggestions or improvements, feel free to open an issue or create a pull request.

## Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ananyamaheshwari.co/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ananya-maheshwari-445158225/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/MaheshwriAnanya)
