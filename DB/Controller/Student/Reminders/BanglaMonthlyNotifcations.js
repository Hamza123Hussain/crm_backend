import Notifications from '../../../Models/Notifications.js'
import { User } from '../../../Models/User.js'

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

const allowedUpdaters = [
  'nijhum.jan24@gmail.com',
  'fahadpccl@gmail.com',
  'meem741@gmail.com',
  '',
]

export const GetBanglaMonthlyNotifcations = async (req, res) => {
  try {
    const { UserEmail, year, month } = req.query

    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser)
      return res.status(404).json({ message: 'User not found' })

    const selectedYear = parseInt(year)
    const selectedMonth = monthNameToIndex[month?.toLowerCase()]
    if (isNaN(selectedYear) || selectedMonth === undefined)
      return res.status(400).json({ message: 'Invalid year or month name' })

    const startOfMonth = new Date(selectedYear, selectedMonth, 1)
    const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59)

    // ✅ Filter by UpdatedBy
    const notifications = await Notifications.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      UpdatedBy: { $in: allowedUpdaters },
    }).sort({ createdAt: -1 })

    if (!notifications || notifications.length === 0)
      return res.status(404).json({ message: 'No notifications found' })

    const tagCounts = {
      NEW: 0,
      'Signed Up': 0,
      POTENTIAL: 0,
      'Not Interested': 0,
    }
    notifications.forEach((notif) => {
      const tag = notif.StudentTag
      if (tagCounts.hasOwnProperty(tag)) tagCounts[tag] += 1
    })

    return res.status(200).json({
      message: 'Notifications fetched successfully',
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
