import { Student } from '../../../Models/Student.js'

export const DeleteContactReminder = async (req, res) => {
  try {
    const { studentid } = req.query

    const SingleStudent = await Student.findById(studentid)
    if (!SingleStudent) {
      return res.status(404).json({ message: 'Student not found' })
    }
    SingleStudent.ContactReminder = null
    await SingleStudent.save()

    return res
      .status(200)
      .json({ message: 'Contact Reminder deleted successfully' })
  } catch (error) {
    console.error('Error deleting Contact Reminder:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
