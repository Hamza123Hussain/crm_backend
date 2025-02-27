import { Student } from '../../../Models/Student.js'
import { User } from '../../../Models/User.js'
export const VisitReminders = async (req, res) => {
  const { Tag, UserEmail } = req.query

  // Check if the user exists
  const existingUser = await User.findOne({ Email: UserEmail })
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' })
  }
  try {
    // Get the date 2 days ago from today
    const CureentDate = new Date()
    // Find students where the last ContactedDate is exactly 2 days ago
    const students = await Student.find({
      'VisitDetails.VisitDate': {
        $gte: new Date(CureentDate.setHours(0, 0, 0, 0)), // Start of the day
        $lte: new Date(CureentDate.setHours(23, 59, 59, 999)), // End of the day
      },
      studentTag: Tag, // Ensure the tag is correctly applied
    }).select('name  MeetingDetails')

    if (!students.length) {
      return res
        .status(404)
        .json({ message: 'No students found with last contact 2 days ago' })
    }

    return res.status(200).json(students)
  } catch (error) {
    console.error('Error fetching students for call reminders:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
