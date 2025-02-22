import { Student } from '../../../Models/Student.js'

export const CallReminders = async (req, res) => {
  try {
    // Get the date 2 days before today
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2) // Subtract 2 days

    // Find students with a ContactedDate exactly 2 days ago
    const students = await Student.find({
      'ContactDetails.ContactedDate': {
        $gte: new Date(twoDaysAgo.setHours(0, 0, 0, 0)), // Start of the day
        $lt: new Date(twoDaysAgo.setHours(23, 59, 59, 999)), // End of the day
      },
    })

    // If no students found
    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: 'No students found with contact reminders' })
    }

    return res.status(200).json({
      message: 'Students who were last contacted 2 days ago',
      students,
    })
  } catch (error) {
    console.error('Error fetching call reminders:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
