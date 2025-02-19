import { Student } from '../../Models/Student.js'

export const GetSingleStudent = async (req, res) => {
  const { studentid } = req.query // Use req.params for ID
  try {
    // Fetch a single student by ID with only required fields
    const SingleStudent = await Student.findById(studentid).select(
      'studentTag VisitDate status notes createdAt updatedAt updatedBy YearIntake Refferal StudentVisited LastContacted attestedByHEC attestedByForeignOffice'
    )

    // If student not found
    if (!SingleStudent) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Return the found student
    return res.status(200).json({ SingleStudent })
  } catch (error) {
    console.error('Error fetching student:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
