// controllers/Student/ContactReminderController.js

import { ContactReminderModel } from '../../../Models/Reminders.js'
import { Student } from '../../../Models/Student.js'

/**
 * Adds a ContactReminder date to a student's record.
 * If the student already has a ContactReminder, you can skip or allow overwriting.
 */
export const AddContactReminder = async (req, res) => {
  try {
    const { studentId } = req.query
    const { ContactReminder } = req.body

    // Validate input
    if (!ContactReminder) {
      return res
        .status(400)
        .json({ message: 'ContactReminder date is required' })
    }

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Optional: Check if already exists
    if (student.ContactReminder) {
      return res.status(400).json({
        message: 'ContactReminder already exists. Use update endpoint.',
      })
    }

    // Set the ContactReminder
    student.ContactReminder = ContactReminder

    // Save the changes
    await student.save()

    // Create new contact reminder document
    await ContactReminderModel.create({
      UserID: studentId,
      UserName: student.name,
      ContactedDate: ContactReminder,
      StudentTag: student.studentTag,
    })

    return res.status(201).json({
      message: 'ContactReminder added successfully',
      contactReminder: student.ContactReminder,
    })
  } catch (error) {
    console.error('Error adding ContactReminder:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
