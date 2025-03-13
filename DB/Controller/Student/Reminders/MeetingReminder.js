import { MeetingReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'

export const MeetingReminders = async (req, res) => {
  try {
    const { UserEmail } = req.query // Extract UserEmail from request

    // ✅ Step 1: Check if the user exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // ✅ Step 2: Get today's date in UTC
    const today = new Date()
    const startOfDay = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate(),
        0,
        0,
        0,
        0
      )
    )
    const endOfDay = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate(),
        23,
        59,
        59,
        999
      )
    )

    // ✅ Step 3: Query database for meetings where MeetingDate is today
    const GetMeetingReminders = await MeetingReminderModel.find({
      MeetingDate: { $gte: startOfDay, $lte: endOfDay },
    })

    // ✅ Step 4: Sort by MeetingDate (latest first), then MeetingTime (latest first)
    GetMeetingReminders.sort((a, b) => {
      const dateA = new Date(a.MeetingDate).getTime()
      const dateB = new Date(b.MeetingDate).getTime()

      if (dateA !== dateB) {
        return dateB - dateA // Sort by date (latest first)
      }

      // Convert MeetingTime (string like "14:30") to minutes
      const [hourA, minuteA] = a.MeetingTime.split(':').map(Number)
      const [hourB, minuteB] = b.MeetingTime.split(':').map(Number)
      const timeA = hourA * 60 + minuteA
      const timeB = hourB * 60 + minuteB

      return timeA - timeB // Sort by time (latest first)
    })

    return res.status(200).json(GetMeetingReminders)
  } catch (error) {
    console.error('Error fetching meeting reminders:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
