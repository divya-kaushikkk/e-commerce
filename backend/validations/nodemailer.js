
export const welcomeEmailTemplate = (firstName, lastName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    
    .content {
      padding: 20px;
      color: #333333;
    }
    
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <p>Hi ${firstName} ${lastName},</p>
      <p>Thank you for signing up! We’re excited to have you on board.</p>
    </div>
  </div>
</body>
</html>
`;

<<<<<<< HEAD
// export const welcomeEmailTemplate = (firstName, lastName) => `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>A Message of Love</title>
// </head>
// <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
//   <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh;">
//     <tr>
//       <td align="center" style="padding: 40px 20px;">
//         <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); overflow: hidden;">
          
//           <tr>
//             <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 30px; text-align: center;">
//               <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
//                 💕 A Special Message for you meh cutuuu 💕
//               </h1>
//             </td>
//           </tr>
          
//           <tr>
//             <td style="padding: 40px 30px 20px; text-align: center;">
//               <h2 style="margin: 0; color: #f5576c; font-size: 24px; font-weight: 600;">
//                 Dear ${firstName} ${lastName} ❤️
//               </h2>
//             </td>
//           </tr>
          
//           <tr>
//             <td style="padding: 0 40px 30px; color: #333333; font-size: 16px; line-height: 1.8; text-align: center;">
//               <p style="margin: 0 0 20px 0;">
//                 Lots of love 💕 💓
//               </p>
//             </td>
//           </tr>
          
//           <tr>
//             <td style="padding: 20px; text-align: center;">
//               <div style="font-size: 30px; letter-spacing: 10px;">
//                 ❤️ 💖 💗 💕 💓
//               </div>
//             </td>
//           </tr>
          
//           <tr>
//             <td style="padding: 30px 40px; text-align: center;">
//               <p style="margin: 0; color: #666; font-size: 18px; font-style: italic;">
//                 Sending you a lot of huggies and kisses 💖 💗 ,
//               </p>
//               <p style="margin: 10px 0 0 0; color: #f5576c; font-size: 22px; font-weight: bold;">
//                 from Divya 💝
//               </p>
//             </td>
//           </tr>

          
//         </table>
//       </td>
//     </tr>
//   </table>
// </body>
// </html>`
=======
export const forgotPassEmail = (resetURL) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 0; margin: 0;">
  <div style="max-width: 500px; margin: 30px auto; background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

    <h2 style="text-align: center; color: #4a4a4a; margin-bottom: 10px;">Reset Your Password</h2>
    <p style="text-align: center; color: #777; font-size: 14px; margin-bottom: 25px;">
      You requested to change your password for your account.
    </p>

    <p style="color: #444; font-size: 15px;">
      Click the button below to reset your password. This link will be valid for the next <strong>1 hour</strong>.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetURL}" 
         style="background: #4F46E5; color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-size: 15px; display: inline-block;">
         Reset Password
      </a>
    </div>

    <p style="font-size: 14px; color: #555;">
      If the button above does not work, copy and paste this link into your browser:
    </p>

    <p style="font-size: 13px; color: #4F46E5; word-break: break-all; margin-bottom: 25px;">
      ${resetURL}
    </p>

    <p style="font-size: 14px; color: #777;">
      If you did not request this, you can ignore this email. Your password will remain unchanged.
    </p>

    <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;" />

    <p style="text-align: center; font-size: 12px; color: #999;">
      © 2025 E-Commerce. All rights reserved.
    </p>

  </div>
</body>
</html>
`;

>>>>>>> 9b5cf8f (Initial commit)
