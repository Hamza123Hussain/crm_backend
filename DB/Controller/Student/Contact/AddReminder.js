// controllers/Student/ContactReminderController.js
import { CallReminders } from '../../../Models/CallReminders.js'
import { Student } from '../../../Models/Student.js'
/**
 * Adds a ContactReminder date to a student's record.
 * If the student already has a ContactReminder, you can skip or allow overwriting.
 */
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

    // --- REMOVED THE "ALREADY EXISTS" CHECK TO ALLOW OVERWRITE ---

    // Update the student record
    student.ContactReminder = ContactReminder
    await student.save()

    /** * OPTIONAL: Update existing reminder log or create a new one.
     * Using findOneAndUpdate ensures we don't spam the CallReminders table
     * if they just edited an existing date.
     */
    await CallReminders.findOneAndUpdate(
      { UserID: studentId },
      {
        UserName: student.name,
        ContactedDate: ContactReminder,
        StudentTag: student.studentTag,
        PhoneNumber: student.phone,
        UpdatedBy: UserEmail,
      },
      { upsert: true, new: true }, // Create if doesn't exist, update if it does
    )

    return res.status(201).json({
      message: 'ContactReminder updated successfully',
      contactReminder: student.ContactReminder,
    })
  } catch (error) {
    console.error('Error adding/updating ContactReminder:', error)
    return res.status(500).json({ message: 'Server error.' })
  }
}
