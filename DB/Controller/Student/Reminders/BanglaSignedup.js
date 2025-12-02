import Notifications from '../../../Models/Notifications.js'
import { User } from '../../../Models/User.js'

const allowedUpdaters = [
  'nijhum.jan24@gmail.com',
  'fahadpccl@gmail.com',
  'meem741@gmail.com',
]

export const GetBanglaSignedUpNotifications = async (req, res) => {
  try {
    const { UserEmail } = req.query

    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser)
      return res.status(404).json({ message: 'User not found' })

    const notifications = await Notifications.find({
      StudentTag: 'Signed Up',
      UpdatedBy: { $in: allowedUpdaters },
    }).sort({ createdAt: -1 })

    if (!notifications || notifications.length === 0)
      return res.status(404).json({ message: 'No notifications found' })

    return res.status(200).json({
      message: 'Signed Up Notifications fetched successfully',
      total: notifications.length,
      notifications,
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
