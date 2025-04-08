import Notifications from '../../Models/Notifications.js'
import { User } from '../../Models/User.js'

export const GetAllNotifcations = async (req, res) => {
  const { UserEmail } = req.query // Extract UserEmail from request query
  // ✅ Step 1: Check if the user exists
  const existingUser = await User.findOne({ Email: UserEmail })
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' })
  }
  const GetAllNotifcations = Notifications.find({}).sort({ createdAt: -1 })

  if (!GetAllNotifcations) {
    return res.status(404).json({ message: 'No notifications found' })
  }
  // ✅ Step 3: Return the notifications
  return res.status(200).json({
    message: 'Notifications fetched successfully',
    notifications: GetAllNotifcations,
  })
}
