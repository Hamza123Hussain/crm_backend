import Notifications from '../../Models/Notifications.js'
import { User } from '../../Models/User.js'

// Convert month names → JS index
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

// Users whose notifications should be excluded
const excludedUpdaters = [
  'nijhum.jan24@gmail.com',
  'fahadpccl@gmail.com',
  'meem741@gmail.com',
  '',
]

export const GetMonthlyNotifcations = async (req, res) => {
  try {
    const { UserEmail, year, month, email } = req.query

    // Validate user
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser)
      return res.status(404).json({ message: 'User not found' })

    // Validate month + year
    const selectedYear = parseInt(year)
    const selectedMonth = monthNameToIndex[month?.toLowerCase()]
    if (isNaN(selectedYear) || selectedMonth === undefined) {
      return res.status(400).json({ message: 'Invalid year or month name' })
    }

    // Date range for filtering
    const startOfMonth = new Date(selectedYear, selectedMonth, 1)
    const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59)

    // Build query
    const query = {
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      UpdatedBy: { $nin: excludedUpdaters }, // Exclude notifications updated by "blocked" users
    }

    // If filtering a specific staff email – override exclusion & show only that user
    if (email && email.trim() !== '') {
      query.UpdatedBy = email.trim()
    }

    const notifications = await Notifications.find(query).sort({
      createdAt: -1,
    })

    // Count tag occurrences
    const tagCounts = {
      NEW: 0,
      'Signed Up': 0,
      POTENTIAL: 0,
      'Not Interested': 0,
    }

    notifications.forEach((notif) => {
      if (tagCounts[notif.StudentTag] !== undefined) {
        tagCounts[notif.StudentTag]++
      }
    })

    return res.status(200).json({
      message:
        notifications.length > 0
          ? 'Notifications fetched successfully'
          : 'No notifications found',
      total: notifications.length,
      tagCounts,
      notifications,
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
