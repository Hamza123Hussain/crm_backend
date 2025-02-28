import { MeetingReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'

export const MeetingReminders = async (req, res) => {
  try {
    const { UserEmail, Tag } = req.query // Extract UserEmail from request

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

    return res.status(200).json(GetMeetingReminders)
  } catch (error) {
    console.error('Error fetching meeting reminders:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
