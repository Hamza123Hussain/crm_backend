import mongoose from 'mongoose'
import { MeetingReminderModel } from '../../../Models/Reminders.js'
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
    // Generate a new ObjectId to use for both records
    const MeetingId = new mongoose.Types.ObjectId()
    // Create new meeting object
    const newMeeting = {
      _id: MeetingId,
      MeetingDate,
      MeetingStatus,
      MeetingTime,
      MeetingReminder,
      MeetingFeedBack,
    }
    // Add to MeetingDetails array
    student.MeetingDetails.push(newMeeting)
    // Save the updated student document
    await student.save()
    const newmeetingreminder = await MeetingReminderModel.create({
      _id: MeetingId,
      UserID: studentId,
      UserName: student.name,
      MeetingDate,
      MeetingStatus,
      MeetingTime,
      MeetingReminder,
      MeetingFeedBack,
      StudentTag: student.studentTag,
    })
    await newmeetingreminder.save()
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
