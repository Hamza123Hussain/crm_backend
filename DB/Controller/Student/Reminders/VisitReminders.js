import { VisitReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'
export const VisitReminders = async (req, res) => {
  const { UserEmail, Tag } = req.query
  // Check if the user exists
  const existingUser = await User.findOne({ Email: UserEmail })
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' })
  }
  try {
    // ✅ Step 2: Get the date exactly 2 days ago
    const CureentDate = new Date()
    // ✅ Step 4: Query database for contacts where ContactedDate is exactly 2 days ago
    const GetVisitReminders = await VisitReminderModel.find({
      VisitDate: {
        $gte: new Date(CureentDate.setHours(0, 0, 0, 0)), // Start of the day
        $lte: new Date(CureentDate.setHours(23, 59, 59, 999)),
      },
      StudentTag: Tag,
    })

    // ✅ Step 4: Sort by MeetingDate (latest first), then.VisitTime (latest first)
    GetVisitReminders.sort((a, b) => {
      const dateA = new Date(a.VisitDate).getTime()
      const dateB = new Date(b.VisitDate).getTime()

      if (dateA !== dateB) {
        return dateB - dateA // Sort by date (latest first)
      }

      // Convert.VisitTime (string like "14:30") to minutes
      const [hourA, minuteA] = a.VisitTime.split(':').map(Number)
      const [hourB, minuteB] = b.VisitTime.split(':').map(Number)
      const timeA = hourA * 60 + minuteA
      const timeB = hourB * 60 + minuteB

      return timeA - timeB // Sort by time (latest first)
    })

    return res.status(200).json(GetVisitReminders)
  } catch (error) {
    console.error('Error fetching students for Visit reminders:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
