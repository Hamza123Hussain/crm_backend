import { Student } from '../../../Models/Student.js'

export const GetOptionDetails = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from query parameters

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    return res.status(200).json({
      message: 'Option details retrieved successfully',
      OptionDetails: student.OptionDetails || {},
    })
  } catch (error) {
    console.error('Error retrieving option details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
