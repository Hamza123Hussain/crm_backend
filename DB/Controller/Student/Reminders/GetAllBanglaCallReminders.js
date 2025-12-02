import { ContactReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'

const allowedUpdaters = [
  'nijhum.jan24@gmail.com',
  'fahadpccl@gmail.com',
  'meem741@gmail.com',
]

export const GetBanglaaAllCallReminders = async (req, res) => {
  try {
    const { UserEmail } = req.query

    // ✅ Step 1: Check if the user exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser)
      return res.status(404).json({ message: 'User not found' })

    // ✅ Step 2: Fetch reminders filtered by UpdatedBy
    const callReminders = await ContactReminderModel.find({
      UpdatedBy: { $in: allowedUpdaters },
    }).sort({ ContactedDate: 1 })

    return res.status(200).json({
      message: 'Call reminders fetched successfully',
      count: callReminders.length,
      data: callReminders,
    })
  } catch (error) {
    console.error(`[CallReminders Error] ${error.message}`, error.stack)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
