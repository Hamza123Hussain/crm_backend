import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { User } from '../../Models/User.js'
import { Storage } from '../../../FireBaseConfig.js'
export const UpdateUser = async (req, res) => {
  const { Email, Role, Name, startrange, endrange } = req.body
  const Image = req.file // The uploaded image file
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ Email })
    if (existingUser) {
      let imageUrl =
        existingUser.imageUrl ||
        'https://static.thenounproject.com/png/363640-200.png'

      // Upload Image to Firebase Storage (if provided)
      if (Image) {
        const storageRef = ref(Storage, `Images/${Image.originalname}`)
        await uploadBytes(storageRef, Image.buffer)
        imageUrl = await getDownloadURL(storageRef)
      }
      // Update user data in MongoDB
      const updatedUser = await User.findByIdAndUpdate(
        existingUser._id,
        {
          Role,
          Name,
          imageUrl,
          startrange,
          endrange,
        },
        { new: true } // Return the updated document
      )
      // If user data was updated successfully
      if (updatedUser) {
        return res.status(200).json({
          message: 'User has been updated successfully',
          user: updatedUser,
        })
      } else {
        return res.status(400).json({ message: 'User update failed' })
      }
    } else {
      return res.status(400).json({ message: 'User does not exist' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
