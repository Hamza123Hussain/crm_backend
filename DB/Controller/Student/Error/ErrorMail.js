import nodemailer from 'nodemailer'

export const sendErrorAlertEmail = async (student) => {
  // Use port 587 with secure: false for modern TLS (StartTLS)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // USE APP PASSWORD HERE
    },
  })

  try {
    // Verify connection before attempting to send
    await transporter.verify();
    
    const mailOptions = {
      from: `"System Alert" <${process.env.EMAIL_USER}>`,
      to: 'admin@school.com', 
      subject: `⚠️ Error Flagged: ${student.name || 'Student ID: ' + student._id}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 2px solid #ef4444; border-radius: 8px;">
          <h2 style="color: #ef4444;">Attention: Data Error Flagged</h2>
          <p>An error has been reported for the following student:</p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Name:</strong> ${student.name || 'N/A'}</li>
            <li><strong>Student ID:</strong> ${student._id}</li>
            <li><strong>Email:</strong> ${student.email || 'N/A'}</li>
          </ul>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            This is an automated message from your School Management Dashboard.
          </p>
        </div>
      `,
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Nodemailer Error:', error);
    throw error; // Rethrow so the controller knows it failed
  }
}