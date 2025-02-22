import { Student } from '../../../Models/Student.js'
export const MeetingReminders = async (req, res) => {
  try {
    // Get the date 2 days ago from today
    const CureentDate = new Date()
    // Find students where the last ContactedDate is exactly 2 days ago
    const students = await Student.find({
      'MeetingDetails.MeetingDate': {
        $gte: new Date(CureentDate.setHours(0, 0, 0, 0)), // Start of the day
        $lte: new Date(CureentDate.setHours(23, 59, 59, 999)), // End of the day
      },
    })

    if (!students.length) {
      return res
        .status(404)
        .json({ message: 'No students found with last contact 2 days ago' })
    }

    return res.status(200).json({
      message: 'Students contacted 2 days ago retrieved successfully',
      students,
    })
  } catch (error) {
    console.error('Error fetching students for call reminders:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
