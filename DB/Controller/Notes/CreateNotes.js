import { Notes } from '../../Models/Notes.js'
import { User } from '../../Models/User.js'
export const CreateNotes = async (req, res) => {
  try {
    const { NotesData } = req.body
    if (!NotesData?.Email || !NotesData?.Name) {
      return res.status(400).json({ Message: 'Name and Email are required.' })
    }
    const FindUser = await User.findOne({ Email: NotesData.Email })
    if (!FindUser) {
      return res.status(404).json({ Message: 'User has not been found.' })
    }
    const CreateNewNote = await Notes.create({
      Name: NotesData.Name,
      Email: NotesData.Email,
      Text: NotesData.Text || '',
      AttachedWith: NotesData.AttachedWith || [],
    })
    return res.status(201).json({
      Message: 'Note created successfully.',
      Note: CreateNewNote,
    })
  } catch (error) {
    return res
      .status(500)
      .json({ Message: 'Internal server error.', Error: error.message })
  }
}
