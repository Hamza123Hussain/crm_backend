import { Student } from '../../../Models/Student.js'

export const DeleteVisaDetails = async (req, res) => {
  try {
    const { studentId } = req.query

    const student = await Student.findById(studentId)
    if (!student || !student.VisaDetails) {
      return res.status(404).json({ message: 'Visa details not found' })
    }

    student.VisaDetails = undefined // Remove VisaDetails
    student.updatedAt = Date.now()
    await student.save()

    return res
      .status(200)
      .json({ message: 'Visa details deleted successfully' })
  } catch (error) {
    console.error('Error deleting visa details:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
