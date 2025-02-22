import { Student } from '../../../Models/Student.js'

export const UpdateContactDetails = async (req, res) => {
  try {
    const { studentId, contactIndex } = req.query // Extract studentId and contactIndex
    const {
      ContactedDate,
      ContactReminder,
      FollowUpMessage,
      ResponseStatus,
      DiscussedWithFamily,
      LocationShared,
    } = req.body

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

    // Get the contact record to update
    const contact = student.ContactDetails[contactIndex]

    // Update only the provided fields
    if (ContactedDate !== undefined) contact.ContactedDate = ContactedDate
    if (ContactReminder !== undefined) contact.ContactReminder = ContactReminder
    if (FollowUpMessage !== undefined) contact.FollowUpMessage = FollowUpMessage
    if (ResponseStatus !== undefined) contact.ResponseStatus = ResponseStatus
    if (DiscussedWithFamily !== undefined)
      contact.DiscussedWithFamily = DiscussedWithFamily
    if (LocationShared !== undefined) contact.LocationShared = LocationShared

    student.markModified('ContactDetails') // Mark as modified
    await student.save()

    return res.status(200).json({
      message: 'Contact record updated successfully',
      contactDetails: student.ContactDetails,
    })
  } catch (error) {
    console.error('Error updating contact details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
