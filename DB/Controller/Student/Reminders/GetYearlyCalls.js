import { ContactReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'

// ✅ Controller to fetch all call reminders for a user in a given year
export const GetYearlyCallReminders = async (req, res) => {
  try {
    // ✅ Extract email and year from query parameters
    const { UserEmail, year } = req.query

    // ✅ Step 1: Check if user exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // ✅ Step 2: Parse and validate year
    const selectedYear = parseInt(year)
    if (isNaN(selectedYear)) {
      return res.status(400).json({ message: 'Invalid year' })
    }

    // ✅ Step 3: Create date range from Jan 1 to Dec 31
    const startOfYear = new Date(selectedYear, 0, 1)
    const endOfYear = new Date(selectedYear, 11, 31, 23, 59, 59)

    // ✅ Step 4: Fetch call reminders in that range
    const callReminders = await ContactReminderModel.find({
      ContactedDate: {
        $gte: startOfYear,
        $lte: endOfYear,
      },
    }).sort({ ContactedDate: 1 })

    // ✅ Step 5: Send response
    return res.status(200).json({
      message: 'Yearly call reminders fetched successfully',
      count: callReminders.length,
      data: callReminders,
    })
  } catch (error) {
    console.error(`[Yearly Call Reminders Error] ${error.message}`, error.stack)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
