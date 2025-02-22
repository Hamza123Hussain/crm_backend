import { Student } from '../../../Models/Student.js'

export const DeleteContactDetails = async (req, res) => {
  try {
    const { studentId, contactIndex } = req.query // Extract studentId and contactIndex

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Ensure ContactDetails exists
    if (
      !student.ContactDetails ||
      student.ContactDetails.length <= contactIndex
    ) {
      return res.status(404).json({ message: 'Contact record not found' })
    }

    // Remove the contact record
    student.ContactDetails.splice(contactIndex, 1)
    student.markModified('ContactDetails') // Mark as modified
    await student.save()

    return res
      .status(200)
      .json({ message: 'Contact record deleted successfully' })
  } catch (error) {
    console.error('Error deleting contact details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
