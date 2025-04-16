import Notifications from '../../Models/Notifications.js'
import { User } from '../../Models/User.js'
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
// ✅ Get notifications
export const GetMonthlyNotifcations = async (req, res) => {
  try {
    // ✅ Extract the email, year, and month from the query parameters
    const { UserEmail, year, month } = req.query
    // If you want to fetch notifications for a specific user, you can uncomment below
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
    // ✅ Step 5: Fetch all notifications from the database, sorted by newest first
    const notifications = await Notifications.find({
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    }).sort({ createdAt: -1 })

    // ✅ Step 6: Check if notifications exist
    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found' })
    }

    // ✅ Step 7: Return the notifications
    return res.status(200).json({
      message: 'Notifications fetched successfully',
      notifications: notifications,
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
