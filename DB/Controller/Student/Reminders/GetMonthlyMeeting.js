import { MeetingReminderModel } from '../../../Models/Reminders.js'
import { User } from '../../../Models/User.js'

// Utility to convert month name to index (0 = Jan, 11 = Dec)
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

export const GetMonthlyMeetings = async (req, res) => {
  try {
    const { UserEmail, year, month, email, date } = req.query // optional email + date

    // Step 1: Check if user exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    let startDate, endDate

    if (date) {
      // Step 2a: If exact date is provided, filter by that day
      const selectedDate = new Date(date)
      if (isNaN(selectedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' })
      }
      startDate = new Date(selectedDate.setHours(0, 0, 0, 0))
      endDate = new Date(selectedDate.setHours(23, 59, 59, 999))
    } else {
      // Step 2b: Otherwise filter by month + year
      const selectedYear = parseInt(year)
      const selectedMonth = monthNameToIndex[month?.toLowerCase()]

      if (isNaN(selectedYear) || selectedMonth === undefined) {
        return res.status(400).json({ message: 'Invalid year or month name' })
      }

      startDate = new Date(selectedYear, selectedMonth, 1)
      endDate = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59)
    }

    // Step 3: Build query
    const query = {
      MeetingDate: { $gte: startDate, $lte: endDate },
    }

    if (email && email.trim() !== '') {
      query.UpdatedBy = email
    }

    // Step 4: Fetch meetings
    const MeetingReminders = await MeetingReminderModel.find(query).sort({
      MeetingDate: 1,
    })

    return res.status(200).json({
      message: 'Meeting reminders fetched successfully',
      count: MeetingReminders.length,
      data: MeetingReminders,
    })
  } catch (error) {
    console.error(`[Meeting Reminders Error] ${error.message}`, error.stack)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
