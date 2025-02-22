import { Student } from '../../../Models/Student.js'

// 🟣 Get all meetings for a student
export const GetAllMeetings = async (req, res) => {
  try {
    const { studentId } = req.query

    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    return res.status(200).json(student.MeetingDetails)
  } catch (error) {
    console.error('Error getting all meetings:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
