import { Student } from '../../../Models/Student.js'

// 🔴 Delete a specific meeting
export const DeleteMeeting = async (req, res) => {
  try {
    const { studentId, meetingId } = req.query

    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Find and remove the meeting
    student.MeetingDetails = student.MeetingDetails.filter(
      (meeting) => meeting._id.toString() !== meetingId
    )

    // Save the updated student document
    await student.save()

    return res.status(200).json({ message: 'Meeting deleted successfully' })
  } catch (error) {
    console.error('Error deleting meeting:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
