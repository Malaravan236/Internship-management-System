const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'priyakanmani578@gmail.com', // Your email
    pass: 'nsla tbtb vwml kgdh', // Your app password
  },
});

// Email endpoint
app.post('/api/send-acceptance-email', async (req, res) => {
  const { toEmail, fullName, internshipTitle } = req.body;

  try {
    const mailOptions = {
      from: 'Your Organization <noreply@yourdomain.com>',
      to: toEmail,
      subject: 'Congratulations! Your Internship Application Has Been Accepted',
      html: `
        <h2>Dear ${fullName},</h2>
        <p>We are pleased to inform you that your application for the ${internshipTitle} internship has been accepted!</p>
        <p>Best regards,<br/>The Hiring Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));