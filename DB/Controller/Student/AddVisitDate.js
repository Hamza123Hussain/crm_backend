import { Student } from '../../Models/Student.js'

export const AddAVisitDate = async (req, res) => {
  try {
    const { studentId, Email } = req.query // Student ID from query parameters
    const { VisitDate } = req.body // VisitDate and updatedBy (email) from request body

    // Validate required fields
    if (!studentId || !VisitDate || !Email) {
      return res.status(400).json({ message: 'Missing required fields.' })
    }

    // Find student by ID
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Update student details
    student.VisitDate = new Date(VisitDate) // Ensure VisitDate is stored as a Date object
    student.updatedBy = Email
    student.updatedAt = new Date() // Correct way to store the current timestamp

    // Save changes
    await student.save()

    return res.status(200).json({
      message: 'Student Visit Date Added Successfully',
      student,
    })
  } catch (error) {
    console.error('Error updating visit date:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
      error: error.message, // Include error details for debugging
    })
  }
}
