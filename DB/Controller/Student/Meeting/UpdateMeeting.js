import { Student } from '../../../Models/Student.js'

// 🟠 Update an existing meeting
export const UpdateMeeting = async (req, res) => {
  try {
    const { studentId, meetingId } = req.query
    const { MeetingDate, MeetingStatus, MeetingReminder, MeetingFeedBack } =
      req.body

    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Find the meeting by its ID
    const meeting = student.MeetingDetails.id(meetingId)
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' })
    }

    // Update only provided fields
    if (MeetingDate !== undefined) meeting.MeetingDate = MeetingDate
    if (MeetingStatus !== undefined) meeting.MeetingStatus = MeetingStatus
    if (MeetingReminder !== undefined) meeting.MeetingReminder = MeetingReminder
    if (MeetingFeedBack !== undefined) meeting.MeetingFeedBack = MeetingFeedBack

    // Save changes
    await student.save()

    return res.status(200).json({
      message: 'Meeting updated successfully',
      updatedMeeting: meeting,
    })
  } catch (error) {
    console.error('Error updating meeting:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
