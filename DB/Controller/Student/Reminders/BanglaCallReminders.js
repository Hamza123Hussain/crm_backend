import { ContactReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'
// Allowed UpdatedBy users
const allowedUpdaters = [
  'nijhum.jan24@gmail.com',
  'fahadpccl@gmail.com',
  'meem741@gmail.com',
]
// Utility to convert month name to index (0 = Jan, 11 = Dec)
const monthNameToIndex = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
}
export const GetBanglaMonthlyCallReminders = async (req, res) => {
  try {
    const { UserEmail, year, month } = req.query

    // Step 1: validate user
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Step 2: convert year + month
    const selectedYear = parseInt(year)
    const selectedMonth = monthNameToIndex[month?.toLowerCase()]

    if (isNaN(selectedYear) || selectedMonth === undefined) {
      return res.status(400).json({ message: 'Invalid year or month name' })
    }

    // Step 3: build date range
    const startOfMonth = new Date(selectedYear, selectedMonth, 1)
    const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59)

    // Step 4: fetch reminders WITH UpdatedBy filter
    const callReminders = await ContactReminderModel.find({
      ContactedDate: { $gte: startOfMonth, $lte: endOfMonth },
      UpdatedBy: { $in: allowedUpdaters }, // <-- added condition
    }).sort({ ContactedDate: 1 })

    return res.status(200).json({
      message: 'Call reminders fetched successfully',
      count: callReminders.length,
      data: callReminders,
    })
  } catch (error) {
    console.error(`[CallReminders Error] ${error.message}`, error.stack)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
