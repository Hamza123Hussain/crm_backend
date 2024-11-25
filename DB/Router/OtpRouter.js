import { Router } from 'express'
import { SendOtp } from '../Controller/Otp/SendOtp.js'
import { VerifyOtp } from '../Controller/Otp/verifyOtp.js'
const OtpRouter = Router()

OtpRouter.post('/SendOtp', SendOtp)
OtpRouter.post('/VerifyOtp', VerifyOtp)

export default OtpRouter
