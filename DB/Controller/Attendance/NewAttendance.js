// NewAttendance.js
import { User } from '../../Models/User.js'
import { AttendanceModel } from '../../Models/Attendance.js'
import { v4 } from 'uuid'
import { getAddressFromCoordinates } from './CurrentLOCATION.js'
export const NewAttendance = async (req, res) => {
  const { Email, EntryTime, CheckInStatus, location } = req.body
  const randomid = v4()
  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })
    if (ExistUser) {
      // Fetch the exact location from latitude and longitude
      const address = await getAddressFromCoordinates(
        location.latitude,
        location.longitude
      )
      // Create a new attendance record
      const NewAttendance = await AttendanceModel.create({
        _id: randomid,
        CheckInStatus: CheckInStatus,
        User_ID: ExistUser.id,
        UserData: ExistUser.Name, // Store user ID instead of just email for better referencing
        Email: ExistUser.Email,
        entry: EntryTime, // Assuming EntryTime is in the correct format
        isAbsent: false, // Mark user as present
        currentDate: new Date(), // Store the current date
        longitude: location.longitude,
        latitude: location.latitude,
        Location: address, // Use the fetched address instead of raw latitude/longitude
      })
      // Respond with success message and the newly created attendance data
      return res.status(201).json({
        message: 'Attendance recorded successfully',
        attendance: NewAttendance,
      })
    } else {
      // If user doesn't exist, respond with 404
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error('Error creating new attendance:', error)
    // Catch any errors and return a 500 status code
    return res.status(500).json({ error: 'Failed to record attendance' })
  }
}
