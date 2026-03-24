import mongoose from 'mongoose'
import { ContactReminderModel } from '../../../Models/Reminders.js'
import { Student } from '../../../Models/Student.js'
import { User } from '../../../Models/User.js'

export const AddContactDetails = async (req, res) => {
  try {
    const { studentId } = req.query
    const {
      ContactedDate,
      FollowUpMessage,
      ResponseStatus,
      DiscussedWithFamily,
      LocationShared,
      ContactedTime,
      ContactText,
      username,
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

    // --- DATE COMPARISON LOGIC ---
    if (student.ContactReminder && ContactedDate) {
      // Normalize both to YYYY-MM-DD strings for a "same day" check
      const reminderDateString = new Date(student.ContactReminder)
        .toISOString()
        .split('T')[0]
      const contactedDateString = new Date(ContactedDate)
        .toISOString()
        .split('T')[0]

      if (reminderDateString === contactedDateString) {
        student.ContactReminder = null
        // Explicitly tell Mongoose this field changed to ensure it saves
        student.markModified('ContactReminder')
      }
    }
    // -----------------------------

    // Generate shared ObjectId for both records
    const contactId = new mongoose.Types.ObjectId()

    // Create a new contact object
    const newContact = {
      _id: contactId,
      ContactedDate: ContactedDate || null,
      FollowUpMessage: FollowUpMessage || false,
      ResponseStatus:
        ResponseStatus === 'Unable To Connect'
          ? 'Powered off'
          : ResponseStatus || 'No Response',
      DiscussedWithFamily: DiscussedWithFamily || false,
      LocationShared: LocationShared || false,
      ContactedTime: ContactedTime || '',
      ContactText: ContactText || '',
      AddedBy: username,
    }

    // Push new contact into student record
    student.ContactDetails.push(newContact)
    student.markModified('ContactDetails')

    await student.save()

    const existingUser = await User.findOne({ Name: username })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    await ContactReminderModel.create({
      _id: contactId,
      UserID: studentId,
      UserName: student.name,
      ContactedDate,
      FollowUpMessage,
      ResponseStatus,
      DiscussedWithFamily,
      LocationShared,
      ContactedTime,
      StudentTag: student.studentTag,
      UpdatedBy: existingUser.Email,
    })

    return res.status(201).json({
      message: 'Contact record added successfully',
      contactDetails: newContact,
    })
  } catch (error) {
    console.error('Error adding contact details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
