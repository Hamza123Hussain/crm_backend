import mongoose from 'mongoose'
import { VisitReminderModel } from '../../../Models/Reminders.js'
import { Student } from '../../../Models/Student.js'

// 🟢 Add a new Visit
export const AddVisit = async (req, res) => {
  try {
    const { studentId } = req.query
    const { VisitDate, VisitTime, VisitStatus } = req.body

    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    const VisitId = new mongoose.Types.ObjectId()
    // Create new Visit object for the student
    const newVisit = { _id: VisitId, VisitDate, VisitTime, VisitStatus }
    student.VisitDetails.push(newVisit)
    await student.save()
    // Generate a new ObjectId to use for both records
    const newVisitreminder = await VisitReminderModel.create({
      _id: VisitId,
      UserID: studentId,
      UserName: student.name,
      VisitDate,
      VisitTime,
      VisitStatus,
    })
    await newVisitreminder.save()

    return res.status(200).json({
      message: 'Visit added successfully',
      Visit: newVisit,
    })
  } catch (error) {
    console.error('Error adding Visit:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
