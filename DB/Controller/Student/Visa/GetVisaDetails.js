import { Student } from '../../../Models/Student.js'

export const GetVisaDetails = async (req, res) => {
  try {
    const { studentId } = req.query

    const student = await Student.findById(studentId)
    if (!student || !student.VisaDetails) {
      return res.status(404).json({ message: 'Visa details not found' })
    }

    return res.status(200).json({
      message: 'Visa details retrieved successfully',
      VisaDetails: student.VisaDetails,
    })
  } catch (error) {
    console.error('Error retrieving visa details:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
