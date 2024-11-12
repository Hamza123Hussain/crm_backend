import { AttendanceModel } from '../../Models/Attendance.js'
import { User } from '../../Models/User.js'

export const UserAttendance = async (req, res) => {
  const { Email, UserData } = req.query
  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })

    if (ExistUser) {
      // Fetch all attendance records for the given user's email
      const allAttendance = await AttendanceModel.find({
        UserData,
      }) // Assuming you store the email in "UserData"

      // If no records are found, return a 404 error
      if (!allAttendance || allAttendance.length === 0) {
        return res.status(404).json({ message: 'No attendance records found' })
      }

      // Respond with success message and the fetched attendance data
      return res.status(200).json(allAttendance)
    } else {
      // If user doesn't exist, respond with 404
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    // Catch any errors and return a 500 status code
    return res.status(500).json({ message: error.message })
  }
}
