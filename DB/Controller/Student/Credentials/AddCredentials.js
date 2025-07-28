import mongoose from 'mongoose'
import { Student } from '../../../Models/Student.js'
export const AddCredentials = async (req, res) => {
  try {
    const { studentId } = req.query
    const {
      UniversityName,
      UniversityLink,
      CourseName,
      Email,
      Password,
      AddedBy,
    } = req.body
    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // Initialize ContactDetails array if not present
    if (!student.Credentials) {
      student.Credentials = []
    }
    // Generate shared ObjectId for both records
    const contactId = new mongoose.Types.ObjectId()

    // Create a new Credential object
    const NewCredentials = {
      _id: contactId,
      UniversityName,
      UniversityLink,
      CourseName,
      Email,
      Password,
      AddedBy,
    }
    // Push new Credential into student record
    student.Credentials.push(NewCredentials)
    student.markModified('Credentials')
    await student.save()
    return res.status(201).json(NewCredentials)
  } catch (error) {
    console.error('Error adding Credential details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
