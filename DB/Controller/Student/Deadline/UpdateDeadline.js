import { Student } from '../../../Models/Student.js'

export const UpdateDeadlineDetails = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from query parameters
    const { DeadlineMessageSent, DeadlineDate, DeadlineReminder } = req.body

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Ensure DeadlineDetails exists
    if (!student.DeadlineDetails) {
      student.DeadlineDetails = {}
    }

    // Update only the provided fields
    if (DeadlineMessageSent !== undefined)
      student.DeadlineDetails.DeadlineMessageSent = DeadlineMessageSent
    if (DeadlineDate !== undefined)
      student.DeadlineDetails.DeadlineDate = DeadlineDate
    if (DeadlineReminder !== undefined)
      student.DeadlineDetails.DeadlineReminder = DeadlineReminder

    student.markModified('DeadlineDetails') // Mark as modified
    await student.save()

    return res.status(200).json({
      message: 'Deadline details updated successfully',
      deadlineDetails: student.DeadlineDetails,
    })
  } catch (error) {
    console.error('Error updating deadline details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
