// controllers/Student/ContactReminderController.js

import { CallReminders } from '../../../Models/CallReminders.js'
import { Student } from '../../../Models/Student.js'

/**
 * Adds a ContactReminder date to a student's record.
 */
export const AddContactReminder = async (req, res) => {
  try {
    const { studentId, useremail } = req.query
    const { ContactReminder } = req.body

    if (!ContactReminder) {
      return res
        .status(400)
        .json({ message: 'ContactReminder date is required' })
    }

    // Log inputs for debugging
    console.log(
      `AddContactReminder called for studentId: ${studentId}, ContactReminder: ${ContactReminder}`
    )

    // Validate MongoDB ObjectId (to prevent cast errors)
    if (!studentId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid student ID format' })
    }

    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Optional check to prevent overwrite
    if (student.ContactReminder) {
      return res.status(400).json({
        message: 'ContactReminder already exists. Use update endpoint.',
      })
    }

    // Assign and save
    student.ContactReminder = new Date(ContactReminder)
    student.updatedAt = new Date()

    await student.save()

    // Create associated reminder log
    await CallReminders.create({
      UserID: studentId,
      UserName: student.name,
      ContactedDate: student.ContactReminder,
      StudentTag: student.studentTag,
      PhoneNumber: student.phone,
      UpdatedBy: useremail,
    })

    return res.status(201).json({
      message: 'ContactReminder added successfully',
      contactReminder: student.ContactReminder,
    })
  } catch (error) {
    console.error('❌ Error in AddContactReminder:', error)

    // If it's a CastError, e.g., bad ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid student ID' })
    }

    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
