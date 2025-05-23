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
    user: process.env.EMAIL_USER || 'priyakanmani578@gmail.com',
    pass: process.env.EMAIL_PASS || 'nsla tbtb vwml kgdh',
  },
});

// Email endpoint
app.post('/api/send-acceptance-email', async (req, res) => {
  const { toEmail, fullName, internshipTitle } = req.body;

  try {
    const mailOptions = {
      from: 'InternConnect <noreply@internconnect.com>',
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;




















// const express = require('express');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// const juice = require('juice');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'priyakanmani578@gmail.com',
//     pass: 'nslatbtbvwmlkgdh',
//   },
// });

// app.post('/api/send-acceptance-email', async (req, res) => {
//   const { toEmail, fullName, internshipTitle, department, duration, startDate } = req.body;

//   try {
//     const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Congratulations on Your Internship!</title>
//         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
//         <style>
//             @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
            
//             :root {
//                 --primary: #0f3460;
//                 --secondary: #1a5f7a;
//                 --accent: #086e7d;
//                 --success: #028090;
//                 --light: #f8f9fa;
//                 --dark: #212529;
//                 --gold: #ffd700;
//                 --silver: #e0e0e0;
//             }
            
//             * {
//                 margin: 0;
//                 padding: 0;
//                 box-sizing: border-box;
//             }
            
//             body {
//                 font-family: 'Montserrat', sans-serif;
//                 background: linear-gradient(135deg, #f6f9fc 0%, #f1f4f8 100%);
//                 min-height: 100vh;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 padding: 30px;
//             }
            
//             .container {
//                 background-color: white;
//                 border-radius: 20px;
//                 box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
//                 width: 100%;
//                 max-width: 800px;
//                 overflow: hidden;
//                 position: relative;
//             }
            
//             .header {
//                 background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
//                 padding: 50px 40px;
//                 color: white;
//                 text-align: center;
//                 position: relative;
//                 overflow: hidden;
//             }
            
//             .header-wave {
//                 position: absolute;
//                 bottom: 0;
//                 left: 0;
//                 width: 100%;
//                 height: 40px;
//                 background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23ffffff' opacity='.25'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' fill='%23ffffff' opacity='.5'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23ffffff' opacity='.75'%3E%3C/path%3E%3C/svg%3E");
//                 background-size: 100% 100%;
//             }
            
//             .tick-icon {
//                 font-size: 60px;
//                 color: var(--gold);
//                 margin-bottom: 20px;
//                 display: inline-block;
//                 background: white;
//                 width: 100px;
//                 height: 100px;
//                 border-radius: 50%;
//                 line-height: 100px;
//                 box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//             }
            
//             .congratulations {
//                 font-family: 'Playfair Display', serif;
//                 font-size: 36px;
//                 font-weight: 700;
//                 margin-bottom: 10px;
//                 position: relative;
//                 z-index: 1;
//             }
            
//             .subtitle {
//                 font-size: 16px;
//                 font-weight: 500;
//                 opacity: 0.95;
//                 position: relative;
//                 z-index: 1;
//                 letter-spacing: 1px;
//                 max-width: 600px;
//                 margin: 0 auto;
//                 padding: 0 20px;
//             }
            
//             .content {
//                 padding: 50px;
//                 position: relative;
//             }
            
//             .message {
//                 color: var(--dark);
//                 font-size: 16px;
//                 line-height: 1.8;
//                 margin-bottom: 30px;
//             }
            
//             .message p {
//                 margin-bottom: 20px;
//             }
            
//             .highlight {
//                 color: var(--accent);
//                 font-weight: 600;
//             }
            
//             .internship-details {
//                 background: #f8f9ff;
//                 padding: 20px;
//                 border-radius: 10px;
//                 margin: 25px 0;
//             }
            
//             .internship-details p {
//                 margin-bottom: 8px;
//                 display: flex;
//             }
            
//             .internship-details strong {
//                 min-width: 120px;
//                 display: inline-block;
//             }
            
//             .divider {
//                 height: 1px;
//                 background: rgba(0, 0, 0, 0.1);
//                 margin: 30px 0;
//                 position: relative;
//             }
            
//             .divider::after {
//                 content: '✧';
//                 position: absolute;
//                 left: 50%;
//                 top: 50%;
//                 transform: translate(-50%, -50%);
//                 background: white;
//                 padding: 0 15px;
//                 color: var(--accent);
//             }
            
//             .signature {
//                 margin-top: 40px;
//                 text-align: right;
//             }
            
//             .signature .name {
//                 font-family: 'Playfair Display', serif;
//                 font-style: italic;
//                 font-size: 18px;
//                 color: var(--primary);
//                 margin-top: 5px;
//             }
            
//             .button-container {
//                 display: flex;
//                 justify-content: center;
//                 margin-top: 40px;
//             }
            
//             .button {
//                 background: linear-gradient(135deg, var(--success) 0%, #05b2c0 100%);
//                 color: white;
//                 border: none;
//                 padding: 16px 40px;
//                 border-radius: 50px;
//                 font-family: 'Montserrat', sans-serif;
//                 font-size: 16px;
//                 font-weight: 600;
//                 cursor: pointer;
//                 transition: all 0.3s ease;
//                 box-shadow: 0 10px 20px rgba(2, 128, 144, 0.2);
//                 text-decoration: none;
//                 display: inline-block;
//             }
            
//             .button:hover {
//                 transform: translateY(-3px);
//                 box-shadow: 0 15px 25px rgba(2, 128, 144, 0.3);
//             }
            
//             .footer {
//                 background-color: #f0f4f8;
//                 padding: 25px 50px;
//                 border-top: 1px solid #e6eaef;
//                 text-align: center;
//                 color: var(--dark);
//                 font-size: 14px;
//             }
            
//             .footer .disclaimer {
//                 opacity: 0.7;
//                 margin-bottom: 10px;
//             }
            
//             @media (max-width: 768px) {
//                 .header {
//                     padding: 40px 20px;
//                 }
                
//                 .content {
//                     padding: 30px;
//                 }
                
//                 .congratulations {
//                     font-size: 28px;
//                 }
                
//                 .internship-details p {
//                     flex-direction: column;
//                 }
                
//                 .internship-details strong {
//                     margin-bottom: 5px;
//                 }
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <div class="header">
                
//                 <div class="congratulations">CONGRATULATIONS!</div>
//                 <div class="subtitle">Your application for ${internshipTitle} has been accepted</div>
//                 <div class="header-wave"></div>
//             </div>
            
//             <div class="content">
//                 <div class="message">
//                     <p>Dear <span class="highlight">${fullName}</span>,</p>
                    
//                     <p>We are delighted to inform you that your application for the <span class="highlight">${internshipTitle}</span> position has been successful!</p>
                    
                    
                    
//                     <p>This is an exciting opportunity for you to gain valuable experience and develop your skills in a professional environment. We were impressed by your qualifications and believe you will make a significant contribution to our team.</p>
                    
//                     <div class="divider"></div>
                    
//                     <p>You will receive further details about the onboarding process, including orientation schedule and required documentation, within the next few days. Please feel free to reach out if you have any questions in the meantime.</p>
                    
//                     <p>Once again, congratulations on this achievement! We look forward to welcoming you to our team.</p>
                    
//                     <div class="signature">
//                         <p>Best regards,</p>
//                         <p class="name">The Hiring Team</p>
//                     </div>
//                 </div>
                
               
//             </div>
            
//             <div class="footer">
//                 <div class="disclaimer">This is an official communication regarding your internship application.</div>
//                 <div>InternConnect &copy; ${new Date().getFullYear()}</div>
//             </div>
//         </div>
//     </body>
//     </html>
//     `;

//     const inlinedHtml = juice(html);

//     const mailOptions = {
//       from: `"InternConnect" <priyakanmani578@gmail.com>`,
//       to: toEmail,
//       subject: `🎉 Congratulations! Your ${internshipTitle} Internship Application Has Been Accepted!`,
//       html: inlinedHtml,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ success: true, message: 'Email sent successfully' });
//   } catch (err) {
//     console.error('Error sending email:', err);
//     res.status(500).json({ success: false, message: 'Failed to send email', error: err.message });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

