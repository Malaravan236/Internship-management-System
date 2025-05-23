


// // const express = require('express');
// // const cors = require('cors');
// // const nodemailer = require('nodemailer');
// // const juice = require('juice'); // For inlining CSS

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Configure Nodemailer transporter
// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: 'priyakanmani578@gmail.com',
// //     pass: 'nsla tbtb vwml kgdh',
// //   },
// // });

// // // Email endpoint
// // app.post('/api/send-acceptance-email', async (req, res) => {
// //   const { toEmail, fullName, internshipTitle } = req.body;

// //   try {
// //     // Enhanced Email Template with Company Logo
// //     const htmlTemplate = `
// //       <!DOCTYPE html>
// //       <html>
// //       <head>
// //           <meta charset="UTF-8">
// //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //           <title>Internship Acceptance</title>
// //           <style>
// //               body {
// //                   font-family: Arial, sans-serif;
// //                   background-color: #ffffff;
// //                   margin: 0;
// //                   padding: 0;
// //                   color: #333;
// //                   display: flex;
// //                   justify-content: center;
// //                   align-items: center;
// //                   min-height: 100vh;
// //               }
// //               .container {
// //                   max-width: 600px;
// //                   background: #ffffff;
// //                   border-radius: 12px;
// //                   overflow: hidden;
// //                   box-shadow: 0 10px 20px rgba(0,0,0,0.15);
// //                   margin: 20px;
// //               }
// //               .header {
// //                   background: linear-gradient(135deg, #1e3a8a, #0ea5e9);
// //                   padding: 30px 20px;
// //                   text-align: center;
// //                   color: #ffffff;
// //                   border-bottom: 5px solid #0ea5e9;
// //               }
// //               .header img {
// //                   width: 100px;
// //                   height: auto;
// //                   margin-bottom: 15px;
// //               }
// //               .header h1 {
// //                   margin: 0;
// //                   font-size: 28px;
// //                   letter-spacing: 1px;
// //               }
// //               .header p {
// //                   margin: 5px 0 0;
// //                   font-size: 16px;
// //                   opacity: 0.9;
// //               }
// //               .content {
// //                   padding: 30px 20px;
// //                   text-align: left;
// //               }
// //               .highlight {
// //                   color: #0ea5e9;
// //                   font-weight: bold;
// //               }
// //               .button {
// //                   display: inline-block;
// //                   background: #0ea5e9;
// //                   color: #ffffff;
// //                   text-decoration: none;
// //                   padding: 12px 30px;
// //                   border-radius: 8px;
// //                   font-weight: bold;
// //                   margin: 20px 0;
// //                   text-align: center;
// //                   transition: background 0.3s;
// //               }
// //               .button:hover {
// //                   background: #1e3a8a;
// //               }
// //               .footer {
// //                   background: #f0f4f8;
// //                   padding: 15px;
// //                   text-align: center;
// //                   font-size: 12px;
// //                   color: #64748b;
// //                   border-top: 1px solid #e2e8f0;
// //               }
// //               .stamp {
// //                   font-size: 18px;
// //                   background: #059669;
// //                   color: #ffffff;
// //                   display: inline-block;
// //                   padding: 8px 16px;
// //                   border-radius: 8px;
// //                   margin-top: 20px;
// //                   text-transform: uppercase;
// //               }
// //               @media only screen and (max-width: 600px) {
// //                   .container {
// //                       width: 100%;
// //                       margin: 10px;
// //                   }
// //                   .header {
// //                       padding: 20px;
// //                   }
// //                   .content {
// //                       padding: 20px;
// //                   }
// //               }
// //           </style>
// //       </head>
// //       <body>
// //           <div class="container">
// //               <!-- Header with Logo -->
// //               <div class="header">
// //                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCR1p5kO7wiSxsVJwyZX-Q6CmfUMa56uqoYg&s" alt="Company Logo">
// //                   <h1>🎉 Congratulations!</h1>
// //                   <p>Your Internship Application Has Been Accepted</p>
// //               </div>
              
// //               <!-- Content -->
// //               <div class="content">
// //                   <p>Dear <span class="highlight">${fullName}</span>,</p>
// //                   <p>We are excited to inform you that your application for the <span class="highlight">${internshipTitle}</span> internship has been accepted!</p>
// //                   <p>Our team is impressed with your qualifications and we are thrilled to have you onboard.</p>
                  
// //                   <p>You will soon receive an onboarding package with all the necessary details.</p>
// //                   <p>If you have any questions, feel free to reach out to us.</p>
                  
// //                   <div style="text-align: center;">
// //                       <a href="#" class="button">Accept Offer</a>
// //                   </div>
                  
// //                   <div class="stamp" style="text-align: center;">ACCEPTED</div>
                  
// //                   <div style="text-align: right; margin-top: 30px;">
// //                       <p style="margin: 0;">Best regards,</p>
// //                       <p style="margin: 0; font-weight: bold; color: #1e3a8a;">The Hiring Team</p>
// //                   </div>
// //               </div>
              
// //               <!-- Footer -->
// //               <div class="footer">
// //                   This is an official communication regarding your internship application.
// //               </div>
// //           </div>
// //       </body>
// //       </html>
// //     `;

// //     // Inline the CSS
// //     const inlinedHtml = juice(htmlTemplate);

// //     const mailOptions = {
// //       from: 'Your Organization <noreply@yourdomain.com>',
// //       to: toEmail,
// //       subject: 'Congratulations! Your Internship Application Has Been Accepted',
// //       html: inlinedHtml
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













// // const express = require('express');
// // const cors = require('cors');
// // const nodemailer = require('nodemailer');
// // const juice = require('juice');

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Nodemailer transporter setup with hardcoded Gmail credentials
// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: 'priyakanmani578@gmail.com',  // ⚠️ Your Gmail
// //     pass: 'nslatbtbvwmlkgdh',           // ⚠️ Your App Password (Not your Gmail login password)
// //   },
// // });

// // app.post('/api/send-acceptance-email', async (req, res) => {
// //   const { toEmail, fullName, internshipTitle } = req.body;

// //   try {
// //     const html = `
// //     <html>
// //       <head>
// //         <style>
// //           body { font-family: Arial, sans-serif; }
// //           .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
// //           .content { padding: 20px; }
// //           .highlight { color: #0ea5e9; font-weight: bold; }
// //           .footer { background: #f0f4f8; text-align: center; padding: 10px; font-size: 12px; color: #64748b; }
// //           .button {
// //             display: inline-block;
// //             background: #0ea5e9;
// //             color: #ffffff;
// //             text-decoration: none;
// //             padding: 10px 20px;
// //             border-radius: 8px;
// //             font-weight: bold;
// //             margin-top: 20px;
// //           }
// //         </style>
// //       </head>
// //       <body>
// //         <div class="header">
// //           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCR1p5kO7wiSxsVJwyZX-Q6CmfUMa56uqoYg&s" width="80" />
// //           <h2>🎉 Congratulations!</h2>
// //           <p>Your Internship Application Has Been Accepted</p>
// //         </div>
// //         <div class="content">
// //           <p>Hello <span class="highlight">${fullName}</span>,</p>
// //           <p>We’re thrilled to offer you the position of <span class="highlight">${internshipTitle}</span>!</p>
// //           <p>Please click the button below to accept your offer:</p>
// //           <a href="#" class="button">Accept Offer</a>
// //           <p>Best regards,<br/>The Hiring Team</p>
// //         </div>
// //         <div class="footer">
// //           This is an official email from InternConnect.
// //         </div>
// //       </body>
// //     </html>
// //     `;

// //     const inlinedHtml = juice(html);

// //     const mailOptions = {
// //       from: `"InternConnect" <priyakanmani578@gmail.com>`,
// //       to: toEmail,
// //       subject: '🎉 Your Internship Application Has Been Accepted!',
// //       html: inlinedHtml,
// //     };

// //     await transporter.sendMail(mailOptions);

// //     res.status(200).json({ success: true, message: 'Email sent successfully' });
// //   } catch (err) {
// //     console.error('Error sending email:', err);
// //     res.status(500).json({ success: false, message: 'Failed to send email' });
// //   }
// // });

// // // Start server
// // const PORT = 3001;
// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on port ${PORT}`);
// // });


// const express = require('express');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// const juice = require('juice');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Nodemailer transporter setup with hardcoded Gmail credentials
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'priyakanmani578@gmail.com',  // ⚠️ Your Gmail
//     pass: 'nslatbtbvwmlkgdh',           // ⚠️ Your App Password (Not your Gmail login password)
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
            
//             .decoration-dots {
//                 position: absolute;
//                 width: 200px;
//                 height: 200px;
//                 background-image: radial-gradient(var(--silver) 2px, transparent 2px);
//                 background-size: 20px 20px;
//                 opacity: 0.3;
//                 z-index: 0;
//             }
            
//             .dots-top-right {
//                 top: -50px;
//                 right: -50px;
//             }
            
//             .dots-bottom-left {
//                 bottom: -50px;
//                 left: -50px;
//             }
            
//             .header {
//                 background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
//                 padding: 50px 40px;
//                 color: white;
//                 text-align: center;
//                 position: relative;
//                 overflow: hidden;
//             }
            
//             .header::before {
//                 content: '';
//                 position: absolute;
//                 top: 0;
//                 left: 0;
//                 right: 0;
//                 bottom: 0;
//                 background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
//                 opacity: 0.1;
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
            
//             .badge-container {
//                 position: relative;
//                 margin: 0 auto 25px;
//                 width: 120px;
//                 height: 120px;
//                 perspective: 1000px;
//             }
            
//             .badge {
//                 width: 100%;
//                 height: 100%;
//                 position: relative;
//                 transform-style: preserve-3d;
//                 animation: rotate 20s infinite linear;
//             }
            
//             @keyframes rotate {
//                 0% { transform: rotateY(0deg); }
//                 100% { transform: rotateY(360deg); }
//             }
            
//             .badge-front, .badge-back {
//                 position: absolute;
//                 width: 100%;
//                 height: 100%;
//                 border-radius: 50%;
//                 backface-visibility: hidden;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 font-size: 40px;
//                 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
//             }
            
//             .badge-front {
//                 background: linear-gradient(135deg, var(--gold) 0%, #ffeb94 100%);
//                 color: var(--primary);
//             }
            
//             .badge-back {
//                 background: linear-gradient(135deg, var(--silver) 0%, white 100%);
//                 color: var(--secondary);
//                 transform: rotateY(180deg);
//             }
            
//             .congratulations {
//                 font-family: 'Playfair Display', serif;
//                 font-size: 36px;
//                 font-weight: 700;
//                 margin-bottom: 10px;
//                 position: relative;
//                 z-index: 1;
//                 text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
//                 padding: 60px 50px;
//                 position: relative;
//             }
            
//             .message {
//                 color: var(--dark);
//                 font-size: 16px;
//                 line-height: 1.8;
//                 margin-bottom: 30px;
//                 position: relative;
//                 z-index: 2;
//             }
            
//             .message p {
//                 margin-bottom: 20px;
//             }
            
//             .highlight {
//                 color: var(--accent);
//                 font-weight: 600;
//             }
            
//             .divider {
//                 position: relative;
//                 height: 1px;
//                 background-color: rgba(0, 0, 0, 0.08);
//                 margin: 30px 0;
//                 overflow: visible;
//             }
            
//             .divider::after {
//                 content: '•';
//                 position: absolute;
//                 left: 50%;
//                 top: 50%;
//                 transform: translate(-50%, -50%);
//                 background: white;
//                 color: var(--accent);
//                 width: 30px;
//                 height: 30px;
//                 border-radius: 50%;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 font-size: 14px;
//             }
            
//             .signature {
//                 margin-top: 40px;
//                 text-align: right;
//                 padding-right: 50px;
//             }
            
//             .signature .name {
//                 font-family: 'Playfair Display', serif;
//                 font-style: italic;
//                 font-size: 18px;
//                 color: var(--primary);
//                 margin-top: 5px;
//             }
            
//             .stamp {
//                 position: absolute;
//                 right: 50px;
//                 bottom: 60px;
//                 width: 120px;
//                 height: 120px;
//                 border: 2px solid var(--success);
//                 border-radius: 50%;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 color: var(--success);
//                 font-weight: 600;
//                 font-size: 18px;
//                 transform: rotate(-12deg);
//                 opacity: 0.85;
//                 z-index: 1;
//                 box-shadow: 0 0 0 5px rgba(2, 128, 144, 0.1);
//             }
            
//             .stamp::after {
//                 content: '';
//                 position: absolute;
//                 top: -5px;
//                 left: -5px;
//                 right: -5px;
//                 bottom: -5px;
//                 border: 1px dashed var(--success);
//                 border-radius: 50%;
//                 opacity: 0.5;
//             }
            
//             .button-container {
//                 display: flex;
//                 justify-content: center;
//                 margin-top: 40px;
//                 position: relative;
//                 z-index: 2;
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
//                 letter-spacing: 1px;
//                 overflow: hidden;
//                 position: relative;
//             }
            
//             .button:hover {
//                 transform: translateY(-3px);
//                 box-shadow: 0 15px 25px rgba(2, 128, 144, 0.3);
//             }
            
//             .button::after {
//                 content: '';
//                 position: absolute;
//                 top: 0;
//                 left: 0;
//                 width: 30%;
//                 height: 100%;
//                 background-color: rgba(255, 255, 255, 0.2);
//                 transform: skewX(-25deg) translateX(-120%);
//                 transition: all 0.5s ease;
//             }
            
//             .button:hover::after {
//                 transform: skewX(-25deg) translateX(300%);
//             }
            
//             .details-box {
//                 background-color: #f8f9ff;
//                 border-radius: 12px;
//                 padding: 25px;
//                 margin: 30px 0;
//                 border-left: 4px solid var(--accent);
//                 box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
//             }
            
//             .details-box h3 {
//                 color: var(--accent);
//                 font-size: 18px;
//                 margin-bottom: 15px;
//                 display: flex;
//                 align-items: center;
//             }
            
//             .details-box h3 i {
//                 margin-right: 10px;
//             }
            
//             .details-box p {
//                 margin-bottom: 10px;
//                 padding-left: 28px;
//             }
            
//             .footer {
//                 background-color: #f0f4f8;
//                 padding: 25px 50px;
//                 border-top: 1px solid #e6eaef;
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;
//                 color: var(--dark);
//                 font-size: 14px;
//             }
            
//             .footer .disclaimer {
//                 opacity: 0.7;
//             }
            
//             .footer .social {
//                 display: flex;
//                 gap: 15px;
//             }
            
//             .footer .social a {
//                 color: var(--primary);
//                 transition: all 0.3s ease;
//             }
            
//             .footer .social a:hover {
//                 color: var(--accent);
//                 transform: translateY(-2px);
//             }
            
//             .confetti {
//                 position: absolute;
//                 width: 8px;
//                 height: 16px;
//                 opacity: 0;
//                 z-index: 10;
//             }
            
//             @media (max-width: 768px) {
//                 .container {
//                     margin: 15px;
//                 }
                
//                 .header {
//                     padding: 40px 20px;
//                 }
                
//                 .content {
//                     padding: 40px 25px;
//                 }
                
//                 .congratulations {
//                     font-size: 28px;
//                 }
                
//                 .badge-container {
//                     width: 100px;
//                     height: 100px;
//                 }
                
//                 .stamp {
//                     width: 90px;
//                     height: 90px;
//                     right: 25px;
//                     bottom: 40px;
//                     font-size: 14px;
//                 }
                
//                 .footer {
//                     padding: 20px 25px;
//                     flex-direction: column;
//                     gap: 10px;
//                     text-align: center;
//                 }
                
//                 .signature {
//                     padding-right: 0;
//                 }
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <div class="decoration-dots dots-top-right"></div>
//             <div class="decoration-dots dots-bottom-left"></div>
            
//             <div class="header">
//                 <div class="badge-container">
//                     <div class="badge">
//                         <div class="badge-front">
//                             <i class="fas fa-award"></i>
//                         </div>
//                         <div class="badge-back">
//                             <i class="fas fa-star"></i>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="congratulations">CONGRATULATIONS!</div>
//                 <div class="subtitle">Your Exceptional Talent Has Earned You a Position in Our ${department || 'Internship'} Team</div>
//                 <div class="header-wave"></div>
//             </div>
            
//             <div class="content">
//                 <div class="message">
//                     <p>Dear <span class="highlight">${fullName}</span>,</p>
                    
//                     <p>It is with great pleasure that we inform you that your application for the <span class="highlight">${internshipTitle}</span> internship has been accepted!</p>
                    
//                     <p>After a thorough review process, our selection committee was particularly impressed by your qualifications, technical skills, and the passion you've demonstrated. We believe your fresh perspective and enthusiasm will be valuable assets to our team.</p>
                    
//                     <div class="details-box">
//                         <h3><i class="fas fa-info-circle"></i> Important Information</h3>
//                         <p><strong>Position:</strong> ${internshipTitle}</p>
//                         <p><strong>Department:</strong> ${department || 'Not specified'}</p>
//                         <p><strong>Duration:</strong> ${duration || 'To be determined'}</p>
//                         <p><strong>Start Date:</strong> ${startDate || 'To be confirmed in follow-up correspondence'}</p>
//                     </div>
                    
//                     <p>This internship will provide you with hands-on experience in a professional environment, working alongside industry experts who are committed to helping you grow. You'll have the opportunity to contribute to meaningful projects while developing your skills.</p>
                    
//                     <div class="divider"></div>
                    
//                     <p>In the coming days, you will receive additional information regarding your onboarding process, including orientation details, required documentation, and your designated mentor. We encourage you to prepare any questions you might have about the role or our organization.</p>
                    
//                     <p>Once again, congratulations on this achievement! We are excited to welcome you to our team and look forward to seeing the contributions you will make.</p>
                    
//                     <div class="signature">
//                         <p>Best regards,</p>
//                         <p class="name">The Hiring Team</p>
//                     </div>
//                 </div>
                
//                 <div class="button-container">
//                     <a href="#" class="button">ACCEPT OFFER</a>
//                 </div>
                
//                 <div class="stamp">ACCEPTED</div>
//             </div>
            
//             <div class="footer">
//                 <div class="disclaimer">This is an official communication regarding your internship application.</div>
//                 <div class="social">
//                     <a href="#"><i class="fab fa-linkedin"></i></a>
//                     <a href="#"><i class="fab fa-twitter"></i></a>
//                     <a href="#"><i class="fab fa-instagram"></i></a>
//                 </div>
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













const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const juice = require('juice');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'priyakanmani578@gmail.com',
    pass: 'nslatbtbvwmlkgdh',
  },
});

app.post('/api/send-acceptance-email', async (req, res) => {
  const { toEmail, fullName, internshipTitle, department, duration, startDate } = req.body;

  try {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Congratulations on Your Internship!</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
            
            :root {
                --primary: #0f3460;
                --secondary: #1a5f7a;
                --accent: #086e7d;
                --success: #028090;
                --light: #f8f9fa;
                --dark: #212529;
                --gold: #ffd700;
                --silver: #e0e0e0;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Montserrat', sans-serif;
                background: linear-gradient(135deg, #f6f9fc 0%, #f1f4f8 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 30px;
            }
            
            .container {
                background-color: white;
                border-radius: 20px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
                width: 100%;
                max-width: 800px;
                overflow: hidden;
                position: relative;
            }
            
            .header {
                background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                padding: 50px 40px;
                color: white;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            
            .header-wave {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 40px;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23ffffff' opacity='.25'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' fill='%23ffffff' opacity='.5'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23ffffff' opacity='.75'%3E%3C/path%3E%3C/svg%3E");
                background-size: 100% 100%;
            }
            
            .tick-icon {
                font-size: 60px;
                color: var(--gold);
                margin-bottom: 20px;
                display: inline-block;
                background: white;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                line-height: 100px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .congratulations {
                font-family: 'Playfair Display', serif;
                font-size: 36px;
                font-weight: 700;
                margin-bottom: 10px;
                position: relative;
                z-index: 1;
            }
            
            .subtitle {
                font-size: 16px;
                font-weight: 500;
                opacity: 0.95;
                position: relative;
                z-index: 1;
                letter-spacing: 1px;
                max-width: 600px;
                margin: 0 auto;
                padding: 0 20px;
            }
            
            .content {
                padding: 50px;
                position: relative;
            }
            
            .message {
                color: var(--dark);
                font-size: 16px;
                line-height: 1.8;
                margin-bottom: 30px;
            }
            
            .message p {
                margin-bottom: 20px;
            }
            
            .highlight {
                color: var(--accent);
                font-weight: 600;
            }
            
            .internship-details {
                background: #f8f9ff;
                padding: 20px;
                border-radius: 10px;
                margin: 25px 0;
            }
            
            .internship-details p {
                margin-bottom: 8px;
                display: flex;
            }
            
            .internship-details strong {
                min-width: 120px;
                display: inline-block;
            }
            
            .divider {
                height: 1px;
                background: rgba(0, 0, 0, 0.1);
                margin: 30px 0;
                position: relative;
            }
            
            .divider::after {
                content: '✧';
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 0 15px;
                color: var(--accent);
            }
            
            .signature {
                margin-top: 40px;
                text-align: right;
            }
            
            .signature .name {
                font-family: 'Playfair Display', serif;
                font-style: italic;
                font-size: 18px;
                color: var(--primary);
                margin-top: 5px;
            }
            
            .button-container {
                display: flex;
                justify-content: center;
                margin-top: 40px;
            }
            
            .button {
                background: linear-gradient(135deg, var(--success) 0%, #05b2c0 100%);
                color: white;
                border: none;
                padding: 16px 40px;
                border-radius: 50px;
                font-family: 'Montserrat', sans-serif;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 10px 20px rgba(2, 128, 144, 0.2);
                text-decoration: none;
                display: inline-block;
            }
            
            .button:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 25px rgba(2, 128, 144, 0.3);
            }
            
            .footer {
                background-color: #f0f4f8;
                padding: 25px 50px;
                border-top: 1px solid #e6eaef;
                text-align: center;
                color: var(--dark);
                font-size: 14px;
            }
            
            .footer .disclaimer {
                opacity: 0.7;
                margin-bottom: 10px;
            }
            
            @media (max-width: 768px) {
                .header {
                    padding: 40px 20px;
                }
                
                .content {
                    padding: 30px;
                }
                
                .congratulations {
                    font-size: 28px;
                }
                
                .internship-details p {
                    flex-direction: column;
                }
                
                .internship-details strong {
                    margin-bottom: 5px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                
                <div class="congratulations">CONGRATULATIONS!</div>
                <div class="subtitle">Your application for ${internshipTitle} has been accepted</div>
                <div class="header-wave"></div>
            </div>
            
            <div class="content">
                <div class="message">
                    <p>Dear <span class="highlight">${fullName}</span>,</p>
                    
                    <p>We are delighted to inform you that your application for the <span class="highlight">${internshipTitle}</span> position has been successful!</p>
                    
                    
                    
                    <p>This is an exciting opportunity for you to gain valuable experience and develop your skills in a professional environment. We were impressed by your qualifications and believe you will make a significant contribution to our team.</p>
                    
                    <div class="divider"></div>
                    
                    <p>You will receive further details about the onboarding process, including orientation schedule and required documentation, within the next few days. Please feel free to reach out if you have any questions in the meantime.</p>
                    
                    <p>Once again, congratulations on this achievement! We look forward to welcoming you to our team.</p>
                    
                    <div class="signature">
                        <p>Best regards,</p>
                        <p class="name">The Hiring Team</p>
                    </div>
                </div>
                
               
            </div>
            
            <div class="footer">
                <div class="disclaimer">This is an official communication regarding your internship application.</div>
                <div>InternConnect &copy; ${new Date().getFullYear()}</div>
            </div>
        </div>
    </body>
    </html>
    `;

    const inlinedHtml = juice(html);

    const mailOptions = {
      from: `"InternConnect" <priyakanmani578@gmail.com>`,
      to: toEmail,
      subject: `🎉 Congratulations! Your ${internshipTitle} Internship Application Has Been Accepted!`,
      html: inlinedHtml,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ success: false, message: 'Failed to send email', error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});