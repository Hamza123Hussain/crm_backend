import { VisitReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'
export const GetAllVisitReminders = async (req, res) => {
  try {
    const { UserEmail } = req.query
    // ✅ Step 1: Check if the user exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    // ✅ Step 2: Fetch reminders (add sort + pagination)
    const VisitReminders = await VisitReminderModel.find().sort({
      VisitDate: 1,
    }) // update the key as per your schema
    //   .skip(parseInt(skip))
    //   .limit(parseInt(limit))
    return res.status(200).json({
      message: 'Visit reminders fetched successfully',
      count: VisitReminders.length,
      data: VisitReminders,
    })
  } catch (error) {
    console.error(`[Visit Reminders Error] ${error.message}`, error.stack)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
