import nodemailer from 'nodemailer'
import { password, user } from '../../../Config.js'
// Function to generate a 6-digit OTP
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000) // Generate a 6-digit OTP
}
// Nodemailer transporter configuration
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user, // Replace with your Gmail address
    pass: password, // Replace with your Gmail App Password
  },
})
