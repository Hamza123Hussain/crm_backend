import { User } from '../../../Models/User.js'
import { Student } from '../../../Models/Student.js'

export const MeetingReminders = async (req, res) => {
  try {
    const { UserEmail } = req.query

    // ✅ Step 1: Validate User
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // ✅ Step 2: Calculate Start and End of Day in Pakistan Standard Time (UTC+5)
    const now = new Date()
    const PKT_OFFSET = 5 * 60 * 60 * 1000
    const nowPKT = new Date(now.getTime() + PKT_OFFSET)

    const year = nowPKT.getUTCFullYear()
    const month = nowPKT.getUTCMonth()
    const day = nowPKT.getUTCDate()

    const startOfDayPKT = new Date(
      Date.UTC(year, month, day, 0, 0, 0, 0) - PKT_OFFSET
    )
    const endOfDayPKT = new Date(
      Date.UTC(year, month, day, 23, 59, 59, 999) - PKT_OFFSET
    )

    // ✅ Step 3: Find students with meetings today
    const studentsWithMeetings = await Student.find({
      'MeetingDetails.MeetingDate': { $gte: startOfDayPKT, $lte: endOfDayPKT },
    })

    // ✅ Step 4: Flatten and filter meetings for today
    const todayMeetings = studentsWithMeetings.flatMap(
      ({ _id, name, StudentTag, MeetingDetails, __v }) =>
        MeetingDetails.filter(({ MeetingDate }) => {
          const date = new Date(MeetingDate)
          return date >= startOfDayPKT && date <= endOfDayPKT
        }).map(
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

    // ✅ Step 5: Sort by MeetingTime (earliest first)
    todayMeetings.sort((a, b) => {
      const [hourA, minA] = a.MeetingTime.split(':').map(Number)
      const [hourB, minB] = b.MeetingTime.split(':').map(Number)
      return hourA * 60 + minA - (hourB * 60 + minB)
    })

    return res.status(200).json(todayMeetings)
  } catch (error) {
    console.error('Error fetching meeting reminders:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
