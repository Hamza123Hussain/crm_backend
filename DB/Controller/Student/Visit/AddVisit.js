import { ReminderModel } from '../../../Models/Reminders.js'
import { Student } from '../../../Models/Student.js'

// 🟢 Add a new Visit
export const AddVisit = async (req, res) => {
  try {
    const { studentId } = req.query
    const { VisitDate, VisitTime, VisitStatus } = req.body

    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Create new Visit object for the student
    const newVisit = { VisitDate, VisitTime, VisitStatus }
    student.VisitDetails.push(newVisit)
    await student.save()

    // Find the existing Reminder document or create a new one
    let reminder = await ReminderModel.findOne({
      'VisitReminder.UserID': studentId,
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
    reminder.VisitReminder.push({
      UserID: studentId,
      UserName: student.name,
      VisitDate,
      VisitTime,
      VisitStatus,
    })

    await reminder.save()

    return res.status(200).json({
      message: 'Visit added successfully',
      Visit: newVisit,
    })
  } catch (error) {
    console.error('Error adding Visit:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
