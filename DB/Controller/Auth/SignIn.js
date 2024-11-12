import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../FireBaseConfig.js'
import { User } from '../../Models/User.js'

export const Login = async (req, res) => {
  const { Email, Password } = req.body

  try {
    // Sign in with Firebase Authentication
    const UserData = await signInWithEmailAndPassword(auth, Email, Password)

    // If Firebase login is successful, search for the user in MongoDB
    if (UserData.user) {
      const UserFound = await User.findOne({ Email })

      // If user is found in MongoDB, return user details
      if (UserFound) {
        return res.status(200).json(UserFound)
      } else {
        // If user is not found in MongoDB, return an error
        return res.status(404).json({ message: 'User not Registered ' })
      }
    } else {
      // Firebase signIn failed for some reason
      return res.status(401).json({ message: 'Invalid login credentials' })
    }
  } catch (error) {
    // Handle errors such as invalid credentials or Firebase issues
    return res.status(500).json({ message: error.message })
  }
}
