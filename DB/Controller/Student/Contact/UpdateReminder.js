// controllers/Student/ContactReminderController.js

import { CallReminders } from '../../../Models/CallReminders.js'
import { Student } from '../../../Models/Student.js'

/**
 * Updates the ContactReminder date for an existing student.
 */
export const UpdateContactReminder = async (req, res) => {
  try {
    const { studentId, useremail } = req.query
    const { ContactReminder } = req.body

    // --- Validate studentId format (MongoDB ObjectId check) ---
    if (!studentId || !studentId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid or missing student ID' })
    }

    // --- Validate ContactReminder ---
    if (!ContactReminder) {
      return res
        .status(400)
        .json({ message: 'ContactReminder date is required' })
    }

    const parsedDate = new Date(ContactReminder)
    if (isNaN(parsedDate)) {
      return res
        .status(400)
        .json({ message: 'Invalid date format for ContactReminder' })
    }

    // --- Fetch student ---
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // --- Update field only if it's different ---
    if (
      student.ContactReminder &&
      new Date(student.ContactReminder).getTime() === parsedDate.getTime()
    ) {
      return res.status(200).json({
        message: 'ContactReminder is already set to this date',
        contactReminder: student.ContactReminder,
      })
    }

    // --- Update and save ---
    student.ContactReminder = parsedDate
    student.updatedAt = new Date()
    await student.save()

    // --- Log change to CallReminders ---
    await CallReminders.create({
      UserID: studentId,
      UserName: student.name,
      ContactedDate: parsedDate,
      StudentTag: student.studentTag,
      PhoneNumber: student.phone,
      UpdatedBy: useremail,
    })

    return res.status(200).json({
      message: 'ContactReminder updated successfully',
      contactReminder: student.ContactReminder,
    })
  } catch (error) {
    console.error('❌ Error updating ContactReminder:', error)

    // Optional: Customize for common error types
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid student ID format' })
    }

    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
