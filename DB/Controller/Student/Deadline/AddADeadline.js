import { Student } from '../../../Models/Student.js'

export const AddDeadlineDetails = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from query parameters
    const { DeadlineMessageSent, DeadlineDate, DeadlineReminder } = req.body

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Initialize DeadlineDetails if not present
    student.DeadlineDetails = {
      DeadlineMessageSent: DeadlineMessageSent || false,
      DeadlineDate: DeadlineDate || null,
      DeadlineReminder: DeadlineReminder || false,
    }

    student.markModified('DeadlineDetails') // Mark as modified
    await student.save()

    return res.status(201).json({
      message: 'Deadline details added successfully',
      deadlineDetails: student.DeadlineDetails,
    })
  } catch (error) {
    console.error('Error adding deadline details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
