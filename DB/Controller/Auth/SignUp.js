import { createUserWithEmailAndPassword } from 'firebase/auth'
import { User } from '../../Models/User.js'
import { auth } from '../../../FireBaseConfig.js'
import { CreateLog } from '../Log/CreateLog.js'
// ✅ Register User Controller
export const RegisterUser = async (req, res) => {
  const { Name, Email, password } = req.body
  // ✅ Validate Required Fields
  if (!Name || !Email || !password) {
    return res
      .status(400)
      .json({ message: 'Name, Email, and Password are required' })
  }
  try {
    // ✅ Check for Existing User
    const existingUser = await User.findOne({ Email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    // ✅ Register User with Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      Email,
      password
    )
    if (userCredential.user.uid) {
      // ✅ Save User in MongoDB
      const userData = new User({
        _id: userCredential.user.uid,
        Name,
        Email,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
      })
      await userData.save()
      // ✅ Log User Activity
      const logStatus = await CreateLog(
        req,
        userCredential.user.uid,
        Name,
        Email,
        'signup'
      )
      return res.status(201).json({
        message: 'User registered successfully',
        user: userData,
        logStatus: logStatus ? 'Log created' : 'Log failed',
      })
    } else {
      return res.status(400).json({ message: 'User registration failed' })
    }
  } catch (error) {
    console.error('❌ Registration Error:', error)
    return res.status(500).json({ message: error.message })
  }
}
