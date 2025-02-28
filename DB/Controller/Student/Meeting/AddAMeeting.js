import { ReminderModel } from '../../../Models/Reminders.js'
import { Student } from '../../../Models/Student.js'
// 🟢 Add a new meeting
export const AddMeeting = async (req, res) => {
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
    // Create new meeting object
    const newMeeting = {
      MeetingDate,
      MeetingStatus,
      MeetingTime,
      MeetingReminder,
      MeetingFeedBack,
    }
    // Add to MeetingDetails array
    student.MeetingDetails.push(newMeeting)
    // Find the existing Reminder document or create a new one
    let reminder = await ReminderModel.findOne({
      'MeetingReminder.UserID': studentId,
    })

    if (!reminder) {
      // Create a new Reminder document if it doesn't exist
      reminder = new ReminderModel({
        VisitReminder: [],
        ContactReminder: [],
        MeetingReminder: [],
      })
    }

    // Push new visit reminder
    reminder.MeetingReminder.push({
      UserID: studentId,
      UserName: student.name,
      MeetingDate,
      MeetingStatus,
      MeetingTime,
      MeetingReminder,
      MeetingFeedBack,
    })

    await reminder.save()
    // Save the updated student document
    await student.save()
    return res.status(200).json({
      message: 'Meeting added successfully',
      meeting: newMeeting,
    })
  } catch (error) {
    console.error('Error adding meeting:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
