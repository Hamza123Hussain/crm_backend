import bcrypt from 'bcryptjs' // Import bcrypt for OTP comparison
import Otp from '../../Models/Otp.js'
export const VerifyOtp = async (req, res) => {
  const { email, otp } = req.body
  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: 'Email and OTP are required.' })
  }
  try {
    // Find the OTP record in the database for the provided email
    const otpRecord = await Otp.findOne({ email })
    if (!otpRecord) {
      return res
        .status(404)
        .json({ success: false, message: 'OTP not found or expired.' })
    }
    // Use bcrypt to compare the provided OTP with the hashed OTP in the database
    const isOtpValid = await bcrypt.compare(otp, otpRecord.otp)
    if (isOtpValid) {
      // OTP is valid
      return res
        .status(200)
        .json({ success: true, message: 'OTP verified successfully.' })
    } else {
      // OTP is invalid
      return res.status(400).json({ success: false, message: 'Invalid OTP.' })
    }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to verify OTP.' })
  }
}
