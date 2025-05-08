import { Notes } from '../../Models/Notes.js'

export const DeleteNote = async (req, res) => {
  try {
    const { id } = req.query

    const deletedNote = await Notes.findByIdAndDelete(id)

    if (!deletedNote) {
      return res.status(404).json({ Message: 'Note not found.' })
    }

    return res
      .status(200)
      .json({ Message: 'Note deleted successfully.', Note: deletedNote })
  } catch (error) {
    return res
      .status(500)
      .json({ Message: 'Internal server error.', Error: error.message })
  }
}
