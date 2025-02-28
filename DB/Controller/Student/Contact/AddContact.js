import { ContactReminderModel } from '../../../Models/Reminders.js'
import { Student } from '../../../Models/Student.js'

export const AddContactDetails = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from query parameters
    const {
      ContactedDate,
      ContactReminder,
      FollowUpMessage,
      ResponseStatus,
      DiscussedWithFamily,
      LocationShared,
      ContactedTime,
    } = req.body

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Initialize ContactDetails array if not present
    if (!student.ContactDetails) {
      student.ContactDetails = []
    }

    // Create a new contact record
    const newContact = {
      ContactedDate: ContactedDate || null,
      ContactReminder: ContactReminder || null,
      FollowUpMessage: FollowUpMessage || false,
      ResponseStatus: ResponseStatus || 'No Response',
      DiscussedWithFamily: DiscussedWithFamily || false,
      LocationShared: LocationShared || false,
      ContactedTime: ContactedTime | '',
    }

    // Add the new contact record
    student.ContactDetails.push(newContact)
    student.markModified('ContactDetails') // Mark array as modified
    await student.save()
    const NewContactReminder = await ContactReminderModel.create({
      UserID: studentId,
      UserName: student.name,
      ContactedDate,
      ContactReminder,
      FollowUpMessage,
      ResponseStatus,
      DiscussedWithFamily,
      LocationShared,
      ContactedTime,
    })
    await NewContactReminder.save()
    return res.status(201).json({
      message: 'Contact record added successfully',
      contactDetails: student.ContactDetails,
    })
  } catch (error) {
    console.error('Error adding contact details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
