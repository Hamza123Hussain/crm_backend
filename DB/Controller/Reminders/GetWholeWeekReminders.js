import { Student } from '../../Models/Student.js'
export const GetWeeklyReminders = async (req, res) => {
  try {
    const today = new Date()
    // Set to start of the current week (Sunday)
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    // Set to end of the current week (Saturday)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    const weeklyReminders = await Student.aggregate([
      {
        $match: {
          ContactReminder: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          ContactReminder: 1,
          lastContactDetail: { $last: '$ContactDetails' },
          // Get day number (1-7)
          dayNum: { $dayOfWeek: '$ContactReminder' },
        },
      },
      {
        $addFields: {
          reminderDay: {
            $switch: {
              branches: [
                { case: { $eq: ['$dayNum', 1] }, then: 'Sunday' },
                { case: { $eq: ['$dayNum', 2] }, then: 'Monday' },
                { case: { $eq: ['$dayNum', 3] }, then: 'Tuesday' },
                { case: { $eq: ['$dayNum', 4] }, then: 'Wednesday' },
                { case: { $eq: ['$dayNum', 5] }, then: 'Thursday' },
                { case: { $eq: ['$dayNum', 6] }, then: 'Friday' },
                { case: { $eq: ['$dayNum', 7] }, then: 'Saturday' },
              ],
              default: 'Unknown',
            },
          },
        },
      },
      {
        $sort: { ContactReminder: 1 },
      },
    ])
    if (weeklyReminders.length === 0) {
      return res
        .status(404)
        .json({ message: 'No reminders found for this week.' })
    }
    return res.status(200).json({
      weeklyReminders,
    })
  } catch (error) {
    console.error('Weekly Reminders Error:', error)
    return res
      .status(500)
      .json({ message: 'Server error while fetching weekly reminders.' })
  }
}
