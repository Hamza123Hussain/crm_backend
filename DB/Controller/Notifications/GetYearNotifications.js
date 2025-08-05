import Notifications from '../../Models/Notifications.js'
import { User } from '../../Models/User.js'

// ✅ Controller to fetch notifications for a specific user for the entire year
export const GetYearlyNotifications = async (req, res) => {
  try {
    // ✅ Step 1: Extract email and year from query parameters
    const { UserEmail, year } = req.query

    // ✅ Step 2: Check if user with the given email exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // ✅ Step 3: Convert year to integer
    const selectedYear = parseInt(year)

    // ✅ Step 4: Validate year input
    if (isNaN(selectedYear)) {
      return res.status(400).json({ message: 'Invalid year' })
    }

    // ✅ Step 5: Create date range (start and end of the year)
    const startOfYear = new Date(selectedYear, 0, 1) // Jan 1
    const endOfYear = new Date(selectedYear, 11, 31, 23, 59, 59) // Dec 31

    // ✅ Step 6: Query the database for notifications in that year
    const notifications = await Notifications.find({
      createdAt: {
        $gte: startOfYear,
        $lte: endOfYear,
      },
    }).sort({ createdAt: -1 })

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

    notifications.forEach((notif) => {
      const tag = notif.StudentTag
      if (tagCounts.hasOwnProperty(tag)) {
        tagCounts[tag] += 1
      }
    })

    // ✅ Step 9: Send success response
    return res.status(200).json({
      message: 'Yearly notifications fetched successfully',
      total: notifications.length,
      tagCounts,
      notifications,
    })
  } catch (error) {
    // ✅ Step 10: Handle any unexpected errors
    console.error('Error fetching yearly notifications:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
