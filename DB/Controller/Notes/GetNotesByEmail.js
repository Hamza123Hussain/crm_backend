import { Notes } from '../../Models/Notes.js'
import { User } from '../../Models/User.js'
export const GetNotesForUser = async (req, res) => {
  const { Email } = req.query
  const FindUser = await User.findOne({ Email })
  if (!FindUser) {
    return res.status(404).json({ Message: 'User has not been found.' })
  }
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
