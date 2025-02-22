import { Student } from '../../../Models/Student.js'

// 🟡 Get a single meeting by meetingId
export const GetMeeting = async (req, res) => {
  try {
    const { studentId, meetingId } = req.query

    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Find the meeting
    const meeting = student.MeetingDetails.id(meetingId)
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' })
    }

    return res.status(200).json(meeting)
  } catch (error) {
    console.error('Error getting meeting:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
