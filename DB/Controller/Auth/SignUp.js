import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { User } from '../../Models/User.js'
import { auth, Storage } from '../../../FireBaseConfig.js'

export const RegisterUser = async (req, res) => {
  const { Name, Email, password, Salary, JobDescription, JobTitle } = req.body
  const Image = req.file // The uploaded Image file

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ Email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      Email,
      password
    )

    if (userCredential.user.uid) {
      let ImageUrl = ''

      // Upload Image to Firebase Storage (if provided)
      if (Image) {
        const storageRef = ref(Storage, `Images/${Image.originalname}`)
        await uploadBytes(storageRef, Image.buffer)
        ImageUrl = await getDownloadURL(storageRef)
      }

      // Prepare user data to be stored in MongoDB
      const userData = new User({
        _id: userCredential.user.uid,
        Name,
        JobTitle,
        Email,
        Salary,
        JobDescription,
        imageUrl: ImageUrl
          ? ImageUrl
          : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png', // Store the Image URL if uploaded
      })

      // Save user data to MongoDB
      await userData.save()

      return res
        .status(201)
        .json({ message: 'User registered successfully', user: userData })
    } else {
      return res.status(400).json({ message: 'User registration failed' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}
