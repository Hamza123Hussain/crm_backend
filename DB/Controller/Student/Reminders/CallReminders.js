import { Student } from '../../../Models/Student.js'
import { User } from '../../../Models/User.js'
export const CallReminders = async (req, res) => {
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
    // ✅ Step 3: Define start and end of the day (00:00 - 23:59 UTC)
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
    // ✅ Step 4: Fetch students who were contacted exactly 2 days ago
    const studentsWithContacts = await Student.find({
      'ContactDetails.ContactedDate': { $gte: startOfDay, $lte: endOfDay },
    })
    // ✅ Step 5: Flatten and filter the contact data for a structured response
    const callReminders = studentsWithContacts.flatMap(
      ({ _id, UserID, UserName, StudentTag, ContactDetails, __v }) =>
        ContactDetails.filter(
          ({ ContactedDate }) =>
            new Date(ContactedDate) >= startOfDay &&
            new Date(ContactedDate) <= endOfDay
        ).map(({ ContactedDate, ContactedTime, ResponseStatus }) => ({
          _id, // Student ID
          UserID, // Unique User ID
          UserName, // Name of the user
          ContactedDate, // The date the student was contacted
          ContactedTime, // Contact time in HH:mm format
          ResponseStatus, // Status of the response (e.g., 'No Response', 'Contacted')
          StudentTag, // Category of the student (e.g., 'NEW', 'FOLLOW-UP')
          __v, // Version key (MongoDB field)
        }))
    )
    // ✅ Step 6: Sort by ContactedDate (latest first) & ContactedTime (latest first)
    callReminders.sort((a, b) => {
      const dateA = new Date(a.ContactedDate).getTime()
      const dateB = new Date(b.ContactedDate).getTime()
      if (dateA !== dateB) {
        return dateB - dateA // Sort by date (latest first)
      }
      // Convert ContactedTime (e.g., "14:30") to total minutes for sorting
      const [hourA, minuteA] = a.ContactedTime.split(':').map(Number)
      const [hourB, minuteB] = b.ContactedTime.split(':').map(Number)
      const timeA = hourA * 60 + minuteA
      const timeB = hourB * 60 + minuteB
      return timeB - timeA // Sort by time (latest first)
    })
    return res.status(200).json(callReminders)
  } catch (error) {
    console.error('Error fetching call reminders:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
