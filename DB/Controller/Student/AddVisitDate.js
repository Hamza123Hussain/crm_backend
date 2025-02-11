import { Student } from '../../Models/Student.js'

export const AddAVisitDate = async (req, res) => {
  const { studentId } = req.query // Get studentId from URL parameter
  const { VisitDate } = req.body
  try {
    // Find student by ID
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // Update student details
    if (VisitDate) student.VisitDate = VisitDate
    await student.save()
    return res
      .status(200)
      .json({ message: 'Student Visit Date Added', student })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
