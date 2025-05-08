import { Notes } from '../../Models/Notes.js'

export const GetNotes = async (req, res) => {
  try {
    const notes = await Notes.find().sort({ createdAt: -1 }) // latest first
    return res.status(200).json(notes)
  } catch (error) {
    return res.status(500).json({
      Message: 'Internal server error while fetching notes.',
      Error: error.message,
    })
  }
}
