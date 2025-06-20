import { CallReminders } from '../../../Models/CallReminders.js'
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
    const callReminders = await CallReminders.find({
      ContactedDate: { $gte: startOfDay, $lte: endOfDay },
    })

    // ✅ Step 6: Sort reminders by date and time
    callReminders.sort((a, b) => {
      const dateA = new Date(a.ContactedDate).getTime()
      const dateB = new Date(b.ContactedDate).getTime()
      if (dateA !== dateB) return dateB - dateA // Sort by date

      const [hourA, minuteA] = a.ContactedTime.split(':').map(Number)
      const [hourB, minuteB] = b.ContactedTime.split(':').map(Number)
      const timeA = hourA * 60 + minuteA
      const timeB = hourB * 60 + minuteB
      return timeB - timeA // Sort by time
    })

    return res.status(200).json(callReminders)
  } catch (error) {
    console.error('Error fetching call reminders:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
