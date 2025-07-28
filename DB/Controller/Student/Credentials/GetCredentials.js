import { Student } from '../../../Models/Student.js'

export const GetAStudentCredentials = async (req, res) => {
  const { studentid } = req.query // Use req.params for ID
  try {
    // Fetch a A student by ID with only required fields
    const AStudent = await Student.findById(studentid)
    // If student not found
    if (!AStudent) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Return the found student
    return res.status(200).json(AStudent.Credentials)
  } catch (error) {
    console.error('Error fetching student:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
