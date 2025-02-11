import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../FireBaseConfig.js'
import { User } from '../../Models/User.js'
import { CreateLog } from '../Log/CreateLog.js'

export const Login = async (req, res) => {
  const { Email, Password } = req.body

  // ✅ Validate Required Fields
  if (!Email || !Password) {
    return res.status(400).json({ message: 'Email and Password are required' })
  }

  try {
    // ✅ Sign In with Firebase Authentication
    const userData = await signInWithEmailAndPassword(auth, Email, Password)

    if (userData.user) {
      // ✅ Find User in MongoDB
      const userFound = await User.findOne({ Email })

      if (userFound) {
        // ✅ Log User Activity
        const logStatus = await CreateLog(
          req,
          userFound.id,
          userFound.Name,
          Email,
          'login' // Changed to 'login' since this is a login action
        )

        return res.status(200).json({
          message: 'Login successful',
          user: userFound,
          logStatus: logStatus ? 'Log created' : 'Log failed',
        })
      } else {
        return res
          .status(404)
          .json({ message: 'User not registered in database' })
      }
    } else {
      return res.status(401).json({ message: 'Invalid login credentials' })
    }
  } catch (error) {
    console.error('❌ Login Error:', error)
    return res.status(500).json({ message: error.message })
  }
}
