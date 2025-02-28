import { VisitReminderModel } from '../../../Models/Reminders.js'
import { Student } from '../../../Models/Student.js'
// 🟠 Update an existing Visit
export const UpdateVisit = async (req, res) => {
  try {
    const { studentId, VisitId } = req.query
    const { VisitDate, VisitTime, VisitStatus } = req.body
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // Find the Visit by its ID
    const Visit = student.VisitDetails.id(VisitId)
    if (!Visit) {
      return res.status(404).json({ message: 'Visit not found' })
    }
    // Update only provided fields
    if (VisitDate !== undefined) Visit.VisitDate = VisitDate
    if (VisitStatus !== undefined) Visit.VisitStatus = VisitStatus
    if (VisitTime !== undefined) Visit.VisitTime = VisitTime
    // Save changes
    await student.save()

    const VisitReminder = await VisitReminderModel.findById(VisitId)
    if (!VisitReminder) {
      return res.status(404).json({ message: 'Visit not found' })
    }
    if (VisitDate !== undefined) VisitReminder.VisitDate = VisitDate
    if (VisitStatus !== undefined) VisitReminder.VisitStatus = VisitStatus
    if (VisitTime !== undefined) VisitReminder.VisitTime = VisitTime
    // Save changes
    await VisitReminder.save()
    return res.status(200).json({
      message: 'Visit updated successfully',
      updatedVisit: Visit,
    })
  } catch (error) {
    console.error('Error updating Visit:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
