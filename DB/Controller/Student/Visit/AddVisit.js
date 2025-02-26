import { Student } from '../../../Models/Student.js'
// 🟢 Add a new Visit
export const AddVisit = async (req, res) => {
  try {
    const { studentId } = req.query
    const { VistDate, VisitTime, VisitStatus } = req.body
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // Create new Visit object
    const newVisit = {
      VistDate,
      VisitStatus,
      VisitTime,
    }
    // Add to VisitDetails array
    student.VisitDetails.push(newVisit)
    // Save the updated student document
    await student.save()
    return res.status(200).json({
      message: 'Visit added successfully',
      Visit: newVisit,
    })
  } catch (error) {
    console.error('Error adding Visit:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
