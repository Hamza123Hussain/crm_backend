import { CallReminders } from '../../../Models/CallReminders.js'
import { Student } from '../../../Models/Student.js'
import { User } from '../../../Models/User.js'
export const OnlyCallReminders = async (req, res) => {
  try {
    const { UserEmail } = req.query // Extract UserEmail from request query
    // ✅ Step 1: Check if the user exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    // ✅ Step 2: Get current UTC date
    const currentDate = new Date()
    // ✅ Step 3: Define today's UTC range: 00:00 to 23:59
    const startOfDay = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        0,
        0,
        0,
        0
      )
    )
    const endOfDay = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        23,
        59,
        59,
        999
      )
    )
    // ✅ Step 4: Fetch students who were contacted today
    const callReminders = await Student.find({
      ContactReminder: { $gte: startOfDay, $lte: endOfDay },
    })
    return res.status(200).json(callReminders)
  } catch (error) {
    console.error('Error fetching call reminders:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
