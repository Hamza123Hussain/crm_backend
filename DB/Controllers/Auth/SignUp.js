import { createUserWithEmailAndPassword } from 'firebase/auth'

import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Auth, db, Storage } from '../../../FireBase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const SignUpController = async (req, res) => {
  const { email, password, Name } = req.body
  const file = req.file
  try {
    // Check if the user already exists
    const userDocRef = doc(db, 'USERS', email)
    const existingUser = await getDoc(userDocRef)

    if (existingUser.exists()) {
      // User already exists
      return res.status(400).json({ message: 'USER ALREADY EXISTS' })
    }

    // Create a new user with email and password
    const UserCredential = await createUserWithEmailAndPassword(
      Auth,
      email,
      password
    )

    let imageUrl = ''

    if (file) {
      // Create a unique file name
      const fileRef = ref(Storage, `User/${Name}`)

      // Upload file to Firebase Storage
      await uploadBytes(fileRef, file.buffer)
      imageUrl = await getDownloadURL(fileRef) // Get the download URL for the uploaded file
    }

    // Check if UserCredential is successfully obtained
    if (UserCredential && UserCredential.user) {
      // Set user details in Firestore
      await setDoc(userDocRef, {
        Name,
        email,
        UserID: UserCredential.user.uid,
        imageUrl,
      })

      // Retrieve and return the user's data
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists()) {
        return res.status(201).json(userDoc.data())
      } else {
        return res
          .status(404)
          .json({ message: 'User data could not be retrieved' })
      }
    }

    // Handle case where UserCredential is not valid
    return res.status(400).json({ message: 'User registration failed' })
  } catch (error) {
    // Handle any errors during sign-up
    console.error('SignUp error:', error)
    return res
      .status(500)
      .json({ message: 'INTERNAL SERVER ERROR', details: error.message })
  }
}
