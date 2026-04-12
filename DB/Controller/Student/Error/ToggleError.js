import { Student } from '../../../Models/Student.js'
import { sendErrorAlertEmail } from './ErrorMail.js'

export const ToggleMarkError = async (req, res) => {
  const { studentid } = req.body

  try {
    // FIX: Pass the value directly. Use Number() since your schema _id is a Number.
    const student = await Student.findById(Number(studentid))

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // 1. Toggle the boolean
    student.markerror = !student.markerror
    await student.save()

    // 2. Alert logic
    if (student.markerror) {
      sendErrorAlertEmail(student).catch((err) =>
        console.error('Email alert failed:', err)
      )
    }

    return res.status(200).json({
      message: `Student error status updated to ${student.markerror}`,
      markerror: student.markerror,
    })
  } catch (error) {
    console.error('Error toggling markerror:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}