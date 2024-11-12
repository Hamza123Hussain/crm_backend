import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../FireBaseConfig.js'

export const ResetPass = async (req, res) => {
  const { Email } = req.body // Extract the email from the request body
  try {
    // Send password reset email using Firebase Auth
    await sendPasswordResetEmail(auth, Email)

    // If successful, send a 200 response
    return res
      .status(200)
      .json({
        message: 'Password reset email sent successfully',
        success: true,
      })
  } catch (error) {
    // Handle error and return error response
    return res.status(500).json({ message: error.message, success: false })
  }
}
