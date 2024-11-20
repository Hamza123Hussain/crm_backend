import { Student } from '../../Models/Student.js'
export const GetNEWStudents = async (req, res) => {
  try {
    // Fetch all students with studentTag 'NEW'
    const newStudents = await Student.find({ studentTag: 'NEW' })

    // Check if there are any 'NEW' students
    if (newStudents.length === 0) {
      return res.status(404).json({ message: 'No new students found' })
    }
    // Return the found students
    return res.status(200).json({ newStudents })
  } catch (error) {
    // Log the error and return a generic server error response
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
