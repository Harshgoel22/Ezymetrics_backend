const nodemailer = require("nodemailer");
require('dotenv').config();

const {MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER} = process.env;

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST || "smtp.gmail.com",
      port: MAIL_PORT || 587,
      secure: false,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"Sender" <${MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    return error.message;
  }
};

module.exports = mailSender;
