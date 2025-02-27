import { Student } from '../../../Models/Student.js'

export const UpdateTestDetails = async (req, res) => {
  const { studentid } = req.query
  const updates = req.body
  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentid, updates, {
      new: true,
      runValidators: true,
      select: 'languageTest languageTestScore',
    })
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' })
    }
    return res.status(200).json(updatedStudent)
  } catch (error) {
    console.error('Error updating test details:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
