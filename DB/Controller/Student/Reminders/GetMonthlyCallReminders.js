import { ContactReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'
// Month to index map
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
export const GetMonthlyCallReminders = async (req, res) => {
  try {
    const { UserEmail, year, month } = req.query
    // Step 1: Validate User
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    // Step 2: Parse dates
    const selectedYear = parseInt(year)
    const selectedMonth = monthNameToIndex[month?.toLowerCase()]
    if (isNaN(selectedYear) || selectedMonth === undefined) {
      return res.status(400).json({ message: 'Invalid year or month name' })
    }
    const startOfMonth = new Date(selectedYear, selectedMonth, 1)
    const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59)
    // Step 3: Aggregate to get latest reminders by UserID + StudentTag
    const reminders = await ContactReminderModel.aggregate([
      {
        $match: {
          ContactedDate: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $sort: {
          ContactedDate: -1, // Sort latest first
        },
      },
      {
        $group: {
          _id: {
            UserID: '$UserID',
            StudentTag: '$StudentTag',
          },
          latestReminder: { $first: '$$ROOT' }, // Pick latest after sorting
        },
      },
      {
        $replaceRoot: { newRoot: '$latestReminder' },
      },
      {
        $sort: {
          ContactedDate: -1, // Optional: sort final results by latest
        },
      },
    ])
    return res.status(200).json({
      message: 'Latest contact reminders per tag fetched successfully',
      count: reminders.length,
      data: reminders,
    })
  } catch (error) {
    console.error('[GetLatestCallRemindersPerTag Error]', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
