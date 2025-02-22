import { Student } from '../../../Models/Student.js'

export const GetDeadlineDetails = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from query parameters

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    return res.status(200).json({
      message: 'Deadline details retrieved successfully',
      deadlineDetails: student.DeadlineDetails || {},
    })
  } catch (error) {
    console.error('Error retrieving deadline details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
