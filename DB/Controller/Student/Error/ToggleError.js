import { Student } from '../../../Models/Student.js'
import { sendErrorAlertEmail } from './ErrorMail.js'

export const ToggleMarkError = async (req, res) => {
  const { studentid } = req.body // Usually better in body for POST/PATCH

  try {
    const student = await Student.findById(studentid)

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // 1. Toggle the boolean
    student.markerror = !student.markerror
    await student.save()

    // 2. If it's now true, trigger the alert
    if (student.markerror) {
      // We don't 'await' this if we don't want to make the user wait for the email to send
      sendErrorAlertEmail(student).catch((err) =>
        console.error('Email failed:', err),
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
