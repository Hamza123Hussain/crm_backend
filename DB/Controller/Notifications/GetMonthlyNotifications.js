import Notifications from '../../Models/Notifications.js'
import { User } from '../../Models/User.js'

// ✅ Utility to convert month name (e.g. "April") to JavaScript month index (0 = Jan)
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

// ✅ Controller to fetch notifications for a specific user and month
export const GetMonthlyNotifcations = async (req, res) => {
  try {
    // ✅ Step 1: Extract email, year, and month from query parameters
    const { UserEmail, year, month } = req.query

    // ✅ Step 2: Check if user with the given email exists in the database
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // ✅ Step 3: Convert year to integer and month name to index (0-11)
    const selectedYear = parseInt(year)
    const selectedMonth = monthNameToIndex[month?.toLowerCase()]

    // ✅ Step 4: Validate year and month inputs
    if (isNaN(selectedYear) || selectedMonth === undefined) {
      return res.status(400).json({ message: 'Invalid year or month name' })
    }

    // ✅ Step 5: Create date range (start and end of the selected month)
    const startOfMonth = new Date(selectedYear, selectedMonth, 1)
    const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59)

    // ✅ Step 6: Query the database for notifications created within the date range
    const notifications = await Notifications.find({
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    }).sort({ createdAt: -1 }) // Sort by most recent

    // ✅ Step 7: If no notifications are found, return 404
    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found' })
    }

    // ✅ Step 8: Count how many times each StudentTag appears
    const tagCounts = {
      NEW: 0,
      'Signed Up': 0,
      POTENTIAL: 0,
      'Not Interested': 0,
    }

    // ✅ Loop through notifications and update tag count
    notifications.forEach((notif) => {
      const tag = notif.StudentTag
      if (tagCounts.hasOwnProperty(tag)) {
        tagCounts[tag] += 1
      }
    })

    // ✅ Step 9: Send successful response with notifications and tag summary
    return res.status(200).json({
      message: 'Notifications fetched successfully',
      total: notifications.length,
      tagCounts,
      notifications,
    })
  } catch (error) {
    // ✅ Step 10: Handle any unexpected server error
    console.error('Error fetching notifications:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
