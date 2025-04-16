import { VisitReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'
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
export const GetMonthlyVisitReminders = async (req, res) => {
  try {
    // ✅ Extract the email, year, and month from the query parameters
    const { UserEmail, year, month } = req.query
    // ✅ Step 1: Check if the user exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    // ✅ Step 2: Convert year and month
    const selectedYear = parseInt(year)
    const selectedMonth = monthNameToIndex[month?.toLowerCase()] // convert string month to index
    // ✅ Step 3: Validate inputs
    if (isNaN(selectedYear) || selectedMonth === undefined) {
      return res.status(400).json({ message: 'Invalid year or month name' })
    }
    // ✅ Step 4: Create date range for that month
    const startOfMonth = new Date(selectedYear, selectedMonth, 1)
    const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59)
    // ✅ Step 4: Fetch reminders (add sort + pagination)
    const VisitReminders = await VisitReminderModel.find({
      VisitDate: { $gte: startOfMonth, $lte: endOfMonth },
    }).sort({
      VisitDate: 1,
    }) // update the key as per your schema
    //   .skip(parseInt(skip))
    //   .limit(parseInt(limit))
    return res.status(200).json({
      message: 'Visit reminders fetched successfully',
      count: VisitReminders.length,
      data: VisitReminders,
    })
  } catch (error) {
    console.error(`[Visit Reminders Error] ${error.message}`, error.stack)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
