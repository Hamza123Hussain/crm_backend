export const generateMeetingEmailHTML = (
  student,
  meeting,
  logoUrl,
  formattedDate
) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: auto; background-color: white;border-radius: 8px; overflow: hidden; border: 1px solid #ddd;">

    <!-- Header -->
 <div style="background-color: white; padding: 30px 20px; text-align: center; color: white;">
  <div style="display: flex; align-items: center; justify-content: center;">
    <!-- Logo -->
    <img src="${logoUrl}" alt="Global Grads Logo" style="max-width: 250px;" />
  </div>
</div>
    <!-- Body -->
    <div style="background-color: #ffffff; padding: 25px 20px;">
      <p style="font-size: 16px;">Hi <strong>${student}</strong>,</p>
      <p style="font-size: 15px;">
        We're thrilled to confirm your upcoming visit to <strong>Global Grads</strong>, your trusted educational consultancy. Here are the details of your scheduled meeting:
      </p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 15px;">
        <tr style="background-color: #f9fafb;">
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Date</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${formattedDate}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Time</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${
            meeting.MeetingTime
          }</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Status</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${
            meeting.MeetingStatus
          }</td>
        </tr>
      </table>
      <p style="margin-top: 25px; font-size: 15px;">
        If you have any questions or need to reschedule, please reply to this email or reach out to our support team.
      </p>
      <p style="margin-top: 30px; font-size: 15px;">Looking forward to welcoming you in person! 🌟</p>

      <p style="margin-top: 25px; font-size: 14px;">
        Warm regards,<br />
        <strong>Global Grads Team</strong><br />
        🌐 <a href="https://www.globalgrads.org" style="color: #0c4a6e; text-decoration: none;">www.globalgrads.org</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f1f5f9; padding: 15px 20px; text-align: center; font-size: 12px; color: #6b7280;">
      © ${new Date().getFullYear()} Global Grads. All rights reserved.
    </div>
  </div>
`
