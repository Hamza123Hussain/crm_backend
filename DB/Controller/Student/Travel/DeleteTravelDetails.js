import { Student } from '../../../Models/Student.js'

export const DeleteTravelDetails = async (req, res) => {
  try {
    const { studentId } = req.query

    const student = await Student.findById(studentId)
    if (!student || !student.TravelDetails) {
      return res.status(404).json({ message: 'Travel details not found' })
    }

    student.TravelDetails = undefined // Remove TravelDetails
    student.updatedAt = Date.now()
    await student.save()

    return res
      .status(200)
      .json({ message: 'Travel details deleted successfully' })
  } catch (error) {
    console.error('Error deleting travel details:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
