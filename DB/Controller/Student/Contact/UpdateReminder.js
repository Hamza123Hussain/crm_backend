import { CallReminders } from '../../../Models/CallReminders.js'
import { Student } from '../../../Models/Student.js'

export const UpdateContactReminder = async (req, res) => {
  try {
    const { studentId } = req.query
    const { ContactReminder } = req.body
    // Validate input
    if (!ContactReminder) {
      return res
        .status(400)
        .json({ message: 'ContactReminder date is required' })
    }
    // Find the student
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // Update the ContactReminder date
    student.ContactReminder = ContactReminder
    student.updatedAt = new Date() // This sets updatedAt to the current date and time.

    // Save the changes
    await student.save()
    // Create new contact reminder document
    await CallReminders.create({
      UserID: studentId,
      UserName: student.name,
      ContactedDate: ContactReminder,
      StudentTag: student.studentTag,
      PhoneNumber: student.phone,
      UpdatedBy: student.updatedBy,
    })
    return res.status(200).json({
      message: 'ContactReminder updated successfully',
      contactReminder: student.ContactReminder,
    })
  } catch (error) {
    console.error('Error updating ContactReminder:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
