import { Student } from '../../../Models/Student.js'

export const GetTravelDetails = async (req, res) => {
  try {
    const { studentId } = req.query

    const student = await Student.findById(studentId)
    if (!student || !student.TravelDetails) {
      return res.status(404).json({ message: 'Travel details not found' })
    }

    return res.status(200).json({
      message: 'Travel details retrieved successfully',
      TravelDetails: student.TravelDetails,
    })
  } catch (error) {
    console.error('Error retrieving travel details:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
