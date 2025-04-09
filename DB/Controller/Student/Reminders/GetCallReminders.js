import { ContactReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'
export const GetAllCallReminders = async (req, res) => {
  try {
    const { UserEmail } = req.query
    // ✅ Step 1: Check if the user exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    // ✅ Step 2: Fetch reminders (add sort + pagination)
    const callReminders = await ContactReminderModel.find().sort({
      ContactedDate: 1,
    }) // update the key as per your schema
    //   .skip(parseInt(skip))
    //   .limit(parseInt(limit))
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
