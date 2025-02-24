import { Student } from '../../../Models/Student.js'
import { User } from '../../../Models/User.js'

// Controller to fetch students who were last contacted exactly 2 days ago
export const CallReminders = async (req, res) => {
  try {
    const { Tag, UserEmail } = req.query // Extract Tag and UserEmail from request body

    // ✅ Step 1: Check if the user exists in the database
    const existingUser = await User.findOne({ Email: UserEmail })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' }) // Return error if user doesn't exist
    }

    // ✅ Step 2: Get the date exactly 2 days before today
    const twoDaysAgo = new Date() // Get current date
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2) // Subtract 2 days

    // ✅ Step 3: Define start and end of the day to filter records within that specific date
    const startOfDay = new Date(twoDaysAgo.setHours(0, 0, 0, 0)) // Start of the day (00:00:00)
    const endOfDay = new Date(twoDaysAgo.setHours(23, 59, 59, 999)) // End of the day (23:59:59)

    // ✅ Step 4: Query the database to find students who match the criteria
    const students = await Student.find({
      'ContactDetails.ContactedDate': { $gte: startOfDay, $lt: endOfDay }, // Students last contacted exactly 2 days ago
      studentTag: Tag, // Filter by studentTag provided in the request
    }).select('name ContactDetails')

    // ✅ Step 5: If no students are found, return a meaningful response
    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: 'No students found with contact reminders' })
    }

    // ✅ Step 6: If students are found, return them in the response
    return res.status(200).json(
      students // Return the list of students
    )
  } catch (error) {
    console.error('Error fetching call reminders:', error) // Log the error for debugging
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' }) // Return generic server error
  }
}
