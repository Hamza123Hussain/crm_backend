import { Student } from '../../../Models/Student.js'

// 🔴 Delete a specific Visit
export const DeleteVisit = async (req, res) => {
  try {
    const { studentId, VisitId } = req.query

    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Find and remove the Visit
    student.VisitDetails = student.VisitDetails.filter(
      (Visit) => Visit._id.toString() !== VisitId
    )

    // Save the updated student document
    await student.save()

    return res.status(200).json({ message: 'Visit deleted successfully' })
  } catch (error) {
    console.error('Error deleting Visit:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
