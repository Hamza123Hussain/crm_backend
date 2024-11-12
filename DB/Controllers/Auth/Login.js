import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { Auth, db } from '../../../FireBase.js'

export const LoginController = async (req, res) => {
  const { email, password } = req.body

  try {
    // Sign in the user with email and password
    const UserCredential = await signInWithEmailAndPassword(
      Auth,
      email,
      password
    )

    // Check if UserCredential is successfully obtained
    if (UserCredential && UserCredential.user) {
      // Fetch the user data from Firestore
      const userDocRef = doc(db, 'USERS', email)
      const userDoc = await getDoc(userDocRef)

      // Check if the document exists and return the data
      if (userDoc.exists()) {
        return res.status(200).json(userDoc.data())
      } else {
        return res
          .status(404)
          .json({ message: 'User data not found in Firestore' })
      }
    }

    // If UserCredential is not valid, send a 404 response
    return res.status(404).json({ message: 'User not registered' })
  } catch (error) {
    // Handle any errors during sign-in
    console.error('Login error:', error)
    return res
      .status(500)
      .json({ message: 'INTERNAL SERVER ERROR', details: error.message })
  }
}
