import { MeetingReminderModel } from '../../../Models/Reminders.js'
import { Student } from '../../../Models/Student.js'
import { User } from '../../../Models/User.js'
export const MeetingReminders = async (req, res) => {
  const { UserEmail } = req.query

  // Check if the user exists
  const existingUser = await User.findOne({ Email: UserEmail })
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' })
  }
  try {
    // ✅ Step 2: Get the date exactly 2 days ago
    const CureentDate = new Date()
    // ✅ Step 4: Query database for contacts where ContactedDate is exactly 2 days ago
    const GetMeetingReminders = await MeetingReminderModel.find({
      MeetingDate: {
        $gte: new Date(CureentDate.setHours(0, 0, 0, 0)), // Start of the day
        $lte: new Date(CureentDate.setHours(23, 59, 59, 999)),
      },
    })
    return res.status(200).json({
      message: 'Meeting reminders fetched successfully',
      MeetingReminders: GetMeetingReminders,
    })
  } catch (error) {
    console.error('Error fetching students for Meeting reminders:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
