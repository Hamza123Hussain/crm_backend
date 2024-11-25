import mongoose from 'mongoose'

// OTP Schema definition
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 minutes (300 seconds)
})

// OTP Model
const Otp = mongoose.model('Otp', otpSchema)

export default Otp
