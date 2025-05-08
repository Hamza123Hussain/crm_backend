import { Notes } from '../../Models/Notes.js'
import { User } from '../../Models/User.js'
export const UpdateNote = async (req, res) => {
  try {
    const { id, Email } = req.query
    const updateData = req.body
    const UserFound = await User.findOne({ Email })
    if (!UserFound) {
      res.status(404).json({ Message: 'USER NOT FOUND' })
    }
    const updatedNote = await Notes.findByIdAndUpdate(id, updateData, {
      new: true,
    })
    if (!updatedNote) {
      return res.status(404).json({ Message: 'Note not found.' })
    }
    return res
      .status(200)
      .json({ Message: 'Note updated successfully.', Note: updatedNote })
  } catch (error) {
    return res
      .status(500)
      .json({ Message: 'Internal server error.', Error: error.message })
  }
}
