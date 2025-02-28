import { ContactReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'
export const CallReminders = async (req, res) => {
  try {
    const { UserEmail, Tag } = req.query // Extract UserEmail from request
    // ✅ Step 1: Check if the user exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    // ✅ Step 2: Get the date exactly 2 days ago
    const today = new Date()
    const twoDaysAgo = new Date(today.setDate(today.getDate() - 2))
    // ✅ Step 3: Adjust the time to match full day range
    twoDaysAgo.setHours(0, 0, 0, 0)
    const endOfDay = new Date(twoDaysAgo)
    endOfDay.setHours(23, 59, 59, 999)
    // ✅ Step 4: Query database for contacts where ContactedDate is exactly 2 days ago
    const GetCallReminders = await ContactReminderModel.find({
      ContactedDate: { $gte: twoDaysAgo, $lte: endOfDay },
      StudentTag: Tag,
    })
    return res.status(200).json(GetCallReminders)
  } catch (error) {
    console.error('Error fetching call reminders:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
