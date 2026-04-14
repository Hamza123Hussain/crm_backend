import { Student } from '../../../Models/Student.js'
import { sendErrorAlertEmail } from './ErrorMail.js'

export const ToggleMarkError = async (req, res) => {
  const { studentid } = req.body

  try {
    const student = await Student.findById(Number(studentid))

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Toggle the boolean
    student.markerror = !student.markerror
    await student.save()

    // Send email only if flagged as TRUE
    if (student.markerror) {
      // We don't 'await' this so the user doesn't wait for the email to send
      sendErrorAlertEmail(student).catch((err) =>
        console.error('Email background task failed:', err.message)
      )
    }

    return res.status(200).json({
      message: `Status updated`,
      markerror: student.markerror,
    })
  } catch (error) {
    console.error('Controller Error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}