import { Student } from '../../../Models/Student.js'
import { User } from '../../../Models/User.js'
export const VisitReminders = async (req, res) => {
  try {
    const { UserEmail } = req.query // Extract UserEmail from request query
    // ✅ Step 1: Check if the user exists
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    // ✅ Step 2: Get the date exactly 2 days ago in UTC
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 2)
    const startOfDay = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        0,
        0,
        0,
        0
      )
    )
    const endOfDay = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        23,
        59,
        59,
        999
      )
    )
    // ✅ Step 3: Fetch students who had visits exactly 2 days ago
    const studentsWithVisits = await Student.find({
      'VisitDetails.VisitDate': { $gte: startOfDay, $lte: endOfDay },
    })
    // ✅ Step 4: Flatten the visit data for a structured response
    const visitReminders = studentsWithVisits.flatMap(
      ({ _id, name, StudentTag, VisitDetails, __v }) =>
        VisitDetails.filter(
          ({ VisitDate }) =>
            new Date(VisitDate) >= startOfDay && new Date(VisitDate) <= endOfDay
        ).map(({ VisitDate, VisitTime, VisitStatus }) => ({
          _id, // Student ID
          name,
          VisitDate, // The date of the visit (filtered for 2 days ago)
          VisitTime, // Visit time in HH:mm format
          VisitStatus, // Status of the visit (e.g., 'Completed', 'Pending')
          StudentTag, // Category of the student (e.g., 'NEW', 'FOLLOW-UP')
          __v, // Version key (MongoDB field)
        }))
    )
    // ✅ Step 5: Sort the visits by VisitDate (latest first) & VisitTime (latest first)
    visitReminders.sort((a, b) => {
      const dateA = new Date(a.VisitDate).getTime()
      const dateB = new Date(b.VisitDate).getTime()
      if (dateA !== dateB) {
        return dateB - dateA // Sort by date (latest first)
      }
      // Convert VisitTime (e.g., "14:30") to total minutes for proper sorting
      const [hourA, minuteA] = a.VisitTime.split(':').map(Number)
      const [hourB, minuteB] = b.VisitTime.split(':').map(Number)
      const timeA = hourA * 60 + minuteA
      const timeB = hourB * 60 + minuteB
      return timeB - timeA // Sort by time (latest first)
    })
    return res.status(200).json(visitReminders)
  } catch (error) {
    console.error('Error fetching visit reminders:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
