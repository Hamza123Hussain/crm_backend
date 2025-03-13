import { User } from '../../../Models/User.js'
import { Student } from '../../../Models/Student.js' // Assuming meetings are stored in Student model
export const MeetingReminders = async (req, res) => {
  try {
    const { UserEmail } = req.query
    // ✅ Step 1: Validate User Existence
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser)
      return res.status(404).json({ message: 'User not found' })
    // ✅ Step 2: Get today's UTC start & end time
    const today = new Date()
    const [year, month, day] = [
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
    ]
    const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0, 0))
    const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999))
    // ✅ Step 3: Fetch students who have meetings today
    const studentsWithMeetings = await Student.find({
      'MeetingDetails.MeetingDate': { $gte: startOfDay, $lte: endOfDay },
    })
    // ✅ Step 4: Flatten meetings & filter only today's meetings
    const todayMeetings = studentsWithMeetings.flatMap(
      (
        { _id, name, StudentTag, MeetingDetails, __v } // Destructure student details
      ) =>
        // 🔹 Filter meetings to include only those scheduled for today
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
            // 🔹 Restructure the data to create a flattened list of meetings
            _id, // Keep student ID
            name,
            MeetingDate, // Include the meeting date (already filtered for today)
            MeetingTime, // Include meeting time
            MeetingStatus, // Include meeting status (e.g., 'scheduled', 'declined')
            MeetingReminder, // Include reminder status (true/false)
            MeetingFeedBack, // Include any feedback from the meeting
            StudentTag, // Keep student tag (e.g., 'NEW', 'FOLLOW-UP')
            __v, // Keep version key (for MongoDB)
          })
        )
    )
    // ✅ Step 5: Sort meetings by MeetingTime (earliest first)
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
