import { ContactReminderModel } from '../../../Models/Reminders.js'
import { Student } from '../../../Models/Student.js'
export const UpdateContactDetails = async (req, res) => {
  try {
    const { studentId, contactIndex } = req.query
    const { ResponseStatus, ContactText, ContactedTime, username } = req.body
    // Step 1: Fetch the student
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // Step 2: Find contact by ObjectId
    const contact = student.ContactDetails[contactIndex]
    if (!contact) {
      return res.status(404).json({ message: 'Contact record not found' })
    }
    // Step 3: Update only if field is provided
    if (ResponseStatus !== undefined) {
      contact.ResponseStatus = ResponseStatus
      contact.ContactText = ContactText
      contact.ContactedTime = ContactedTime
      contact.AddedBy = username
    }
    // Step 4: Save changes
    await student.save()
    const NewContactReminder = await ContactReminderModel.create({
      UserID: studentId,
      UserName: student.name,
      ContactedDate: contact.ContactedDate,
      FollowUpMessage: contact.FollowUpMessage,
      ResponseStatus: contact.ResponseStatus,
      DiscussedWithFamily: contact.DiscussedWithFamily,
      LocationShared: contact.LocationShared,
      ContactedTime: contact.ContactedTime,
      StudentTag: student.status[0],
      UpdatedBy: student.updatedBy,
    })
    await NewContactReminder.save()
    return res.status(200).json({
      message: 'Contact record updated successfully',
      contactDetails: student.ContactDetails,
    })
  } catch (error) {
    console.error('Error updating contact details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
