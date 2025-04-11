import nodemailer from 'nodemailer'
import { generateMeetingEmailHTML } from './DB/Controller/Student/Meeting/EmailStructure.js'

export const MeetingEmail = (student, meeting) => {
  const formattedDate = new Date(meeting.MeetingDate).toLocaleDateString(
    'en-GB',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  const logoUrl =
    'https://globalgrads.org/wp-content/uploads/2023/09/4-e1694180342836.png'

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hamzahussain14.hh@gmail.com',
      pass: 'oqhk wnvs ptsf mdse',
    },
  })

  const mailOptions = {
    from: 'hamzahussain14.hh@gmail.com',
    to: student.email,
    subject: 'Your Meeting with Global Grads is Confirmed',
    html: generateMeetingEmailHTML(
      student.name,
      meeting,
      logoUrl,
      formattedDate
    ),
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.error('❌ Error sending email:', err)
    }
    console.log('✅ Email sent:', info.response)
  })
}
