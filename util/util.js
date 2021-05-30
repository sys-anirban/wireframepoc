const nodemailer = require('nodemailer');

const MailOptions = (receiverMailId, senderMailid, OTP) => {
  return {
    from: senderMailid,
    to: receiverMailId,
    subject: 'Login OTP',
    html: `<p>Hello your OTP is ${OTP}</p>`,
  };
};
const mailTransporter = (email, password) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });
  return transporter;
};
module.exports = { MailOptions, mailTransporter };
