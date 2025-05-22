// // const express = require('express');
// // const cors = require('cors');
// // const nodemailer = require('nodemailer');
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Configure Nodemailer transporter
// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: 'priyakanmani578@gmail.com', // Your email
// //     pass: 'nsla tbtb vwml kgdh', // Your app password
// //   },
// // });

// // // Email endpoint
// // app.post('/api/send-acceptance-email', async (req, res) => {
// //   const { toEmail, fullName, internshipTitle } = req.body;

// //   try {
// //     const mailOptions = {
// //       from: 'Your Organization <noreply@yourdomain.com>',
// //       to: toEmail,
// //       subject: 'Congratulations! Your Internship Application Has Been Accepted',
// //       html: `
// //         <h2>Dear ${fullName},</h2>
// //         <p>We are pleased to inform you that your application for the ${internshipTitle} internship has been accepted!</p>
// //         <p>Best regards,<br/>The Hiring Team</p>
// //       `,
// //     };

// //     await transporter.sendMail(mailOptions);
// //     res.status(200).json({ success: true, message: 'Email sent successfully' });
// //   } catch (error) {
// //     console.error('Error sending email:', error);
// //     res.status(500).json({ success: false, message: 'Failed to send email' });
// //   }
// // });

// // const PORT = process.env.PORT || 3001;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));












// const express = require('express');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// const juice = require('juice'); // For inlining CSS

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Configure Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'priyakanmani578@gmail.com',
//     pass: 'nsla tbtb vwml kgdh',
//   },
// });

// // Email endpoint
// app.post('/api/send-acceptance-email', async (req, res) => {
//   const { toEmail, fullName, internshipTitle } = req.body;

//   try {
//     // Enhanced Email Template with Company Logo
//     const htmlTemplate = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Internship Acceptance</title>
//         <style>
//             body {
//                 font-family: Arial, sans-serif;
//                 background-color: #ffffff;
//                 margin: 0;
//                 padding: 0;
//                 color: #333;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 min-height: 100vh;
//             }
//             .container {
//                 max-width: 600px;
//                 background: #ffffff;
//                 border-radius: 12px;
//                 overflow: hidden;
//                 box-shadow: 0 10px 20px rgba(0,0,0,0.15);
//                 margin: 20px;
//             }
//             .header {
//                 background: linear-gradient(135deg, #1e3a8a, #0ea5e9);
//                 padding: 30px 20px;
//                 text-align: center;
//                 color: #ffffff;
//                 border-bottom: 5px solid #0ea5e9;
//             }
//             .header img {
//                 width: 100px;
//                 height: auto;
//                 margin-bottom: 15px;
//             }
//             .header h1 {
//                 margin: 0;
//                 font-size: 28px;
//                 letter-spacing: 1px;
//             }
//             .header p {
//                 margin: 5px 0 0;
//                 font-size: 16px;
//                 opacity: 0.9;
//             }
//             .content {
//                 padding: 30px 20px;
//                 text-align: left;
//             }
//             .highlight {
//                 color: #0ea5e9;
//                 font-weight: bold;
//             }
//             .button {
//                 display: inline-block;
//                 background: #0ea5e9;
//                 color: #ffffff;
//                 text-decoration: none;
//                 padding: 12px 30px;
//                 border-radius: 8px;
//                 font-weight: bold;
//                 margin: 20px 0;
//                 text-align: center;
//                 transition: background 0.3s;
//             }
//             .button:hover {
//                 background: #1e3a8a;
//             }
//             .footer {
//                 background: #f0f4f8;
//                 padding: 15px;
//                 text-align: center;
//                 font-size: 12px;
//                 color: #64748b;
//                 border-top: 1px solid #e2e8f0;
//             }
//             .stamp {
//                 font-size: 18px;
//                 background: #059669;
//                 color: #ffffff;
//                 display: inline-block;
//                 padding: 8px 16px;
//                 border-radius: 8px;
//                 margin-top: 20px;
//                 text-transform: uppercase;
//             }
//             @media only screen and (max-width: 600px) {
//                 .container {
//                     width: 100%;
//                     margin: 10px;
//                 }
//                 .header {
//                     padding: 20px;
//                 }
//                 .content {
//                     padding: 20px;
//                 }
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <!-- Header with Logo -->
//             <div class="header">
//                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCR1p5kO7wiSxsVJwyZX-Q6CmfUMa56uqoYg&s" alt="Company Logo">
//                 <h1>🎉 Congratulations!</h1>
//                 <p>Your Internship Application Has Been Accepted</p>
//             </div>
            
//             <!-- Content -->
//             <div class="content">
//                 <p>Dear <span class="highlight">${fullName}</span>,</p>
//                 <p>We are excited to inform you that your application for the <span class="highlight">${internshipTitle}</span> internship has been accepted!</p>
//                 <p>Our team is impressed with your qualifications and we are thrilled to have you onboard.</p>
                
//                 <p>You will soon receive an onboarding package with all the necessary details.</p>
//                 <p>If you have any questions, feel free to reach out to us.</p>
                
//                 <div style="text-align: center;">
//                     <a href="#" class="button">Accept Offer</a>
//                 </div>
                
//                 <div class="stamp" style="text-align:center;">ACCEPTED</div>
                
//                 <div style="text-align:right;margin-top:30px;">
//                     <p style="margin:0;">Best regards,</p>
//                     <p style="margin:0;font-weight:bold;color:#1e3a8a;">The Hiring Team</p>
//                 </div>
//             </div>
            
//             <!-- Footer -->
//             <div class="footer">
//                 This is an official communication regarding your internship application.
//             </div>
//         </div>
//     </body>
//     </html>
//     `;

//     // Inline the CSS
//     const inlinedHtml = juice(htmlTemplate);

//     const mailOptions = {
//       from: 'Your Organization <noreply@yourdomain.com>',
//       to: toEmail,
//       subject: 'Congratulations! Your Internship Application Has Been Accepted',
//       html: inlinedHtml
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ success: false, message: 'Failed to send email' });
//   }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const juice = require('juice'); // For inlining CSS

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'priyakanmani578@gmail.com',
    pass: 'nsla tbtb vwml kgdh',
  },
});

// Email endpoint
app.post('/api/send-acceptance-email', async (req, res) => {
  const { toEmail, fullName, internshipTitle } = req.body;

  try {
    // Enhanced Email Template with Company Logo
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Internship Acceptance</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #ffffff;
                  margin: 0;
                  padding: 0;
                  color: #333;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
              }
              .container {
                  max-width: 600px;
                  background: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
                  margin: 20px;
              }
              .header {
                  background: linear-gradient(135deg, #1e3a8a, #0ea5e9);
                  padding: 30px 20px;
                  text-align: center;
                  color: #ffffff;
                  border-bottom: 5px solid #0ea5e9;
              }
              .header img {
                  width: 100px;
                  height: auto;
                  margin-bottom: 15px;
              }
              .header h1 {
                  margin: 0;
                  font-size: 28px;
                  letter-spacing: 1px;
              }
              .header p {
                  margin: 5px 0 0;
                  font-size: 16px;
                  opacity: 0.9;
              }
              .content {
                  padding: 30px 20px;
                  text-align: left;
              }
              .highlight {
                  color: #0ea5e9;
                  font-weight: bold;
              }
              .button {
                  display: inline-block;
                  background: #0ea5e9;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 12px 30px;
                  border-radius: 8px;
                  font-weight: bold;
                  margin: 20px 0;
                  text-align: center;
                  transition: background 0.3s;
              }
              .button:hover {
                  background: #1e3a8a;
              }
              .footer {
                  background: #f0f4f8;
                  padding: 15px;
                  text-align: center;
                  font-size: 12px;
                  color: #64748b;
                  border-top: 1px solid #e2e8f0;
              }
              .stamp {
                  font-size: 18px;
                  background: #059669;
                  color: #ffffff;
                  display: inline-block;
                  padding: 8px 16px;
                  border-radius: 8px;
                  margin-top: 20px;
                  text-transform: uppercase;
              }
              @media only screen and (max-width: 600px) {
                  .container {
                      width: 100%;
                      margin: 10px;
                  }
                  .header {
                      padding: 20px;
                  }
                  .content {
                      padding: 20px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <!-- Header with Logo -->
              <div class="header">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCR1p5kO7wiSxsVJwyZX-Q6CmfUMa56uqoYg&s" alt="Company Logo">
                  <h1>🎉 Congratulations!</h1>
                  <p>Your Internship Application Has Been Accepted</p>
              </div>
              
              <!-- Content -->
              <div class="content">
                  <p>Dear <span class="highlight">${fullName}</span>,</p>
                  <p>We are excited to inform you that your application for the <span class="highlight">${internshipTitle}</span> internship has been accepted!</p>
                  <p>Our team is impressed with your qualifications and we are thrilled to have you onboard.</p>
                  
                  <p>You will soon receive an onboarding package with all the necessary details.</p>
                  <p>If you have any questions, feel free to reach out to us.</p>
                  
                  <div style="text-align: center;">
                      <a href="#" class="button">Accept Offer</a>
                  </div>
                  
                  <div class="stamp" style="text-align: center;">ACCEPTED</div>
                  
                  <div style="text-align: right; margin-top: 30px;">
                      <p style="margin: 0;">Best regards,</p>
                      <p style="margin: 0; font-weight: bold; color: #1e3a8a;">The Hiring Team</p>
                  </div>
              </div>
              
              <!-- Footer -->
              <div class="footer">
                  This is an official communication regarding your internship application.
              </div>
          </div>
      </body>
      </html>
    `;

    // Inline the CSS
    const inlinedHtml = juice(htmlTemplate);

    const mailOptions = {
      from: 'Your Organization <noreply@yourdomain.com>',
      to: toEmail,
      subject: 'Congratulations! Your Internship Application Has Been Accepted',
      html: inlinedHtml
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