import { MeetingReminderModel } from '../../../Models/Reminders.js'
import { Student } from '../../../Models/Student.js'

export const UpdateLastMeeting = async (req, res) => {
  try {
    const { studentId } = req.query
    const {
      MeetingDate,
      MeetingStatus,
      MeetingTime,
      MeetingReminder,
      MeetingFeedBack,
    } = req.body
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    const meetingCount = student.MeetingDetails.length
    if (meetingCount === 0) {
      return res.status(404).json({ message: 'No meetings to update' })
    }
    const lastMeeting = student.MeetingDetails[meetingCount - 1]
    // Update only provided fields
    if (MeetingDate !== undefined) lastMeeting.MeetingDate = MeetingDate
    if (MeetingStatus !== undefined) lastMeeting.MeetingStatus = MeetingStatus
    if (MeetingReminder !== undefined)
      lastMeeting.MeetingReminder = MeetingReminder
    if (MeetingFeedBack !== undefined)
      lastMeeting.MeetingFeedBack = MeetingFeedBack
    if (MeetingTime !== undefined) lastMeeting.MeetingTime = MeetingTime
    await student.save()
    // Also update the same in MeetingReminderModel if the ID matches
    const MeetingReminderDoc = await MeetingReminderModel.findById(
      lastMeeting._id
    )
    if (MeetingReminderDoc) {
      if (MeetingDate !== undefined)
        MeetingReminderDoc.MeetingDate = MeetingDate
      if (MeetingStatus !== undefined)
        MeetingReminderDoc.MeetingStatus = MeetingStatus
      if (MeetingReminder !== undefined)
        MeetingReminderDoc.MeetingReminder = MeetingReminder
      if (MeetingFeedBack !== undefined)
        MeetingReminderDoc.MeetingFeedBack = MeetingFeedBack
      if (MeetingTime !== undefined)
        MeetingReminderDoc.MeetingTime = MeetingTime
      await MeetingReminderDoc.save()
    }
    return res.status(200).json(lastMeeting)
  } catch (error) {
    console.error('Error updating last meeting:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
