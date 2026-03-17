// controllers/Student/ContactReminderController.js
import { CallReminders } from '../../../Models/CallReminders.js'
import { Student } from '../../../Models/Student.js'
/**
 * Adds a ContactReminder date to a student's record.
 * If the student already has a ContactReminder, you can skip or allow overwriting.
 */
// controllers/Student/ContactReminderController.js
// controllers/Student/ContactReminderController.js
export const AddContactReminder = async (req, res) => {
  try {
    const { studentId, UserEmail } = req.query
    const { ContactReminder } = req.body

    if (!ContactReminder) {
      return res
        .status(400)
        .json({ message: 'ContactReminder date is required' })
    }

    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // ❌ REMOVE THIS BLOCK BELOW TO STOP THE 400 ERROR:
    // if (student.ContactReminder) { ... }

    // ✅ ALWAYS overwrite the value
    student.ContactReminder = ContactReminder
    await student.save()

    // ✅ Update the CallReminders log (Upsert logic)
    // This finds the existing log for this student and updates it,
    // or creates a new one if it doesn't exist.
    await CallReminders.findOneAndUpdate(
      { UserID: studentId },
      {
        UserName: student.name,
        ContactedDate: ContactReminder,
        StudentTag: student.studentTag,
        PhoneNumber: student.phone,
        UpdatedBy: UserEmail,
      },
      { upsert: true, new: true },
    )

    return res.status(201).json({
      message: 'ContactReminder updated successfully',
      contactReminder: student.ContactReminder,
    })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
