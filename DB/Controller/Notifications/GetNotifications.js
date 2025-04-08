import Notifications from '../../Models/Notifications.js'
import { User } from '../../Models/User.js'

// ✅ Get all notifications
export const GetAllNotifcations = async (req, res) => {
  try {
    // Optional: If you want to filter by user in the future
    const { UserEmail } = req.query

    // If you want to fetch notifications for a specific user, you can uncomment below
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // ✅ Step 1: Fetch all notifications from the database, sorted by newest first
    const notifications = await Notifications.find({}).sort({ createdAt: -1 })

    // ✅ Step 2: Check if notifications exist
    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found' })
    }

    // ✅ Step 3: Return the notifications
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
