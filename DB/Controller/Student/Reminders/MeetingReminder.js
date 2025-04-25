import { User } from '../../../Models/User.js'
import { Student } from '../../../Models/Student.js'

// Helper to get PKT start and end time for today
const getPakistanStartAndEndOfDay = () => {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const parts = formatter.formatToParts(now)
  const year = parseInt(parts.find((p) => p.type === 'year')?.value || '0', 10)
  const month =
    parseInt(parts.find((p) => p.type === 'month')?.value || '1', 10) - 1
  const day = parseInt(parts.find((p) => p.type === 'day')?.value || '1', 10)

  const startOfDay = new Date(Date.UTC(year, month, day, 19, 0, 0, 0)) // 00:00 PKT = 19:00 UTC (previous day)
  const endOfDay = new Date(Date.UTC(year, month, day + 1, 18, 59, 59, 999)) // 23:59:59 PKT = 18:59:59 UTC (same day)

  return { startOfDay, endOfDay }
}

export const MeetingReminders = async (req, res) => {
  try {
    const { UserEmail } = req.query

    // ✅ Step 1: Validate User
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser)
      return res.status(404).json({ message: 'User not found' })

    // ✅ Step 2: Get PKT day boundaries
    const { startOfDay, endOfDay } = getPakistanStartAndEndOfDay()

    // ✅ Step 3: Fetch students with meetings today
    const studentsWithMeetings = await Student.find({
      'MeetingDetails.MeetingDate': { $gte: startOfDay, $lte: endOfDay },
    })

    // ✅ Step 4: Flatten & filter meetings
    const todayMeetings = studentsWithMeetings.flatMap(
      ({ _id, name, StudentTag, MeetingDetails, __v }) =>
        MeetingDetails.filter(
          ({ MeetingDate }) =>
            new Date(MeetingDate) >= startOfDay &&
            new Date(MeetingDate) <= endOfDay
        ).map(
          ({
            MeetingDate,
            MeetingTime,
            MeetingStatus,
            MeetingReminder,
            MeetingFeedBack,
          }) => ({
            _id,
            name,
            MeetingDate,
            MeetingTime,
            MeetingStatus,
            MeetingReminder,
            MeetingFeedBack,
            StudentTag,
            __v,
          })
        )
    )

    // ✅ Step 5: Sort by MeetingTime
    todayMeetings.sort((a, b) => {
      const [hourA, minA] = a.MeetingTime.split(':').map(Number)
      const [hourB, minB] = b.MeetingTime.split(':').map(Number)
      return hourA * 60 + minA - (hourB * 60 + minB)
    })

    return res.status(200).json(todayMeetings)
  } catch (error) {
    console.error('Error fetching meeting reminders:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
