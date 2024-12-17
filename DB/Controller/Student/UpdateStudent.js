import { Student } from '../../Models/Student.js'
// Update Student Controller
export const updateStudentDetails = async (req, res) => {
  const { studentId } = req.query // Get studentId from URL parameter
  const {
    studentTag,
    status,
    YearIntake,
    attestedByHEC,
    attestedByForeignOffice,
    notes,
  } = req.body
  try {
    // Find student by ID
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // Update student details
    if (studentTag) student.studentTag = studentTag
    if (status) student.status = status
    if (attestedByHEC !== undefined) student.attestedByHEC = attestedByHEC // Check if it's a boolean value
    if (attestedByForeignOffice !== undefined)
      student.attestedByForeignOffice = attestedByForeignOffice // Check if it's a boolean value
    if (notes) student.notes = notes
    // Save the updated student record to MongoDB
    if (YearIntake) student.YearIntake = YearIntake
    await student.save()
    return res
      .status(200)
      .json({ message: 'Student updated successfully', student })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
