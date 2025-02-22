import { Student } from '../../../Models/Student.js'

export const DeleteDeadlineDetails = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from query parameters

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Delete DeadlineDetails field
    student.DeadlineDetails = undefined

    student.markModified('DeadlineDetails') // Mark as modified
    await student.save()

    return res
      .status(200)
      .json({ message: 'Deadline details deleted successfully' })
  } catch (error) {
    console.error('Error deleting deadline details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
