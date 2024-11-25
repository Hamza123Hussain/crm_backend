import Otp from '../../Models/Otp.js'
import bcrypt from 'bcryptjs' // Import bcrypt to hash the OTP
import { generateOtp, transporter } from './Email_and_otp.js'
import { user } from '../../../Config.js'
export const SendOtp = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: 'Email is required.' })
  }
  const otp = generateOtp()
  const saltRounds = 10 // Set the salt rounds for bcrypt
  try {
    // Hash the OTP before storing it
    const hashedOtp = await bcrypt.hash(otp.toString(), saltRounds)
    // Check if email exists in the database
    const emailexist = await Otp.findOne({ email })
    if (emailexist) {
      // If email exists, update the OTP for the existing record (hashed)
      emailexist.otp = hashedOtp
      await emailexist.save()
    } else {
      // If email doesn't exist, create a new OTP record (hashed)
      await Otp.create({ email, otp: hashedOtp })
    }
    // Send OTP to email, using HTML for styling
    const mailOptions = {
      from: user, // Your email address
      to: email,
      subject: 'Your OTP Code',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #6a4cfa; text-align: center;">Your OTP Code</h2>
              <p style="font-size: 16px; color: #333; line-height: 1.5;">Hello User</p>
              <p style="font-size: 16px; color: #333; line-height: 1.5;">Your OTP code is <strong style="color: #6a4cfa;">${otp}</strong>.</p>
              <p style="font-size: 14px; color: #999; text-align: center;">If you did not request this OTP, please ignore this email.</p>
              <div style="text-align: center; margin-top: 20px;">
                <p style="font-size: 14px; color: #777;">Best regards,</p>
                <p style="font-size: 14px; color: #777;">The Octtoppus Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }
    await transporter.sendMail(mailOptions)
    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully.',
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to send OTP.' })
  }
}
