import Notifications from '../../Models/Notifications.js'
import { User } from '../../Models/User.js'
// ✅ Controller to fetch notifications for a specific user and month
export const GetSignedUpNotifcations = async (req, res) => {
  try {
    // ✅ Step 1: Extract email, year, and month from query parameters
    const { UserEmail } = req.query
    // ✅ Step 2: Check if user with the given email exists in the database
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    // ✅ Step 6: Query the database for notifications created within the date range
    const notifications = await Notifications.find({
      StudentTag: 'Signed Up',
    }).sort({ createdAt: -1 }) // Sort by most recent

    // ✅ Step 7: If no notifications are found, return 404
    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found' })
    }
    // ✅ Step 9: Send successful response with notifications and tag summary
    return res.status(200).json({
      message: 'Signed Up Notfications fetched successfully',
      total: notifications.length,
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
