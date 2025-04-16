import { Resend } from 'resend'
import { generateMeetingEmailHTML } from './DB/Controller/Student/Meeting/EmailStructure.js'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export const MeetingEmail = async (student, meeting) => {
  try {
    // Format date
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
    const emailHTML = generateMeetingEmailHTML(
      student.name,
      meeting,
      logoUrl,
      formattedDate
    )

    // Send email via Resend
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: student.email,
      subject: 'Your Meeting with Global Grads is Confirmed',
      html: emailHTML,
    })

    console.log('✅ Email sent:', data)
  } catch (error) {
    console.error('❌ Resend error:', error)
  }
}
