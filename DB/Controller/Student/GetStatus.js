import { Student } from '../../Models/Student.js'

export const GetStudentStatusandTag = async (req, res) => {
  const { studentid } = req.query // Use req.params for ID
  try {
    // Fetch a single student by ID with only required fields
    const StudentStatus = await Student.findById(studentid).select(
      'status updatedBy studentTag'
    )

    // If student not found
    if (!StudentStatus) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Return the found student
    return res.status(200).json(StudentStatus)
  } catch (error) {
    console.error('Error fetching student:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
