import mongoose from 'mongoose'
import { ContactReminderModel } from '../../../Models/Reminders.js'
import { Student } from '../../../Models/Student.js'

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
    }

    // Push new contact into student record
    student.ContactDetails.push(newContact)
    student.markModified('ContactDetails')
    await student.save()

    // Create new contact reminder document
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
