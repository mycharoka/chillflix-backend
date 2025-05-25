const nodemailer = require('nodemailer');
require('dotenv').config(); // pastikan env dibaca

const { MAILER_USERNAME, MAILER_PASSWORD, RECIPIENT_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: MAILER_USERNAME,
    pass: MAILER_PASSWORD,
  },
});

const sendRegisterEmail = async (to, name) => {
  const mailOptions = {
    from: '"Chillflix 👾" <chillflix@noreply.co.id>',
    to: RECIPIENT_EMAIL,
    subject: '🎉 Welcome to Chillflix!',
    html: `
      <h2>Hello ${name},</h2>
      <p>Thanks for registering on <strong>Chillflix</strong>!</p>
      <p>We’re excited to have you onboard.</p>
      <br/>
      <p>Best regards,<br/>The Chillflix Team</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.messageId);
    console.log("🔗 Preview URL:", nodemailer.getTestMessageUrl(info));

    return {
      statusCode: 200,
      data: {
        message: 'Email Verified successfully',
        preview: nodemailer.getTestMessageUrl(info), // cuma muncul kalau Ethereal
      },
    };
  } catch (error) {
    console.error("❌ Failed to send email:", error);

    return {
      statusCode: 500,
      data: { message: 'Failed to send email', error: error.message },
    };
  }
};

module.exports = sendRegisterEmail;
