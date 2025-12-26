import Notifications from '../../Models/Notifications.js'
import { User } from '../../Models/User.js'

// Utility to convert month name to JS month index
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

// Controller to fetch notifications for a specific user and month
export const GetMonthlyNotifications = async (req, res) => {
  try {
    const { UserEmail, year, month, email } = req.query

    // Check if user exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Parse year and month
    const selectedYear = parseInt(year)
    const selectedMonth = monthNameToIndex[month?.toLowerCase()]

    if (isNaN(selectedYear) || selectedMonth === undefined) {
      return res.status(400).json({ message: 'Invalid year or month name' })
    }

    const startOfMonth = new Date(selectedYear, selectedMonth, 1)
    const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59)

    // Build query dynamically
    const query = {
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    }

    if (email && email.trim() !== '') {
      query.UpdatedBy = email
    }

    // Fetch notifications
    const notifications = await Notifications.find(query).sort({
      createdAt: -1,
    })

    // Count StudentTag occurrences
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

    // Return result (even if notifications array is empty)
    return res.status(200).json({
      message: notifications.length
        ? 'Notifications fetched successfully'
        : 'No notifications found for the given filters',
      total: notifications.length,
      tagCounts,
      notifications,
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
