import nodemailer from 'nodemailer'

export const sendErrorAlertEmail = async (student) => {
  // Configure your SMTP settings (Gmail, Mailtrap, SendGrid, etc.)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: '"System Alert" <noreply@school.com>',
    to: 'admin@school.com', // Your email
    subject: `⚠️ Error Flagged: ${student.name || 'Student'}`,
    text: `An error has been flagged for student ID: ${student._id}. Please review their academic records.`,
    html: `<p><strong>Alert:</strong> Student <b>${student._id}</b> has been marked with an error.</p>`,
  }

  return transporter.sendMail(mailOptions)
}
