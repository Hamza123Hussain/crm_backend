import { AttendanceModel } from '../../Models/Attendance.js'
import { User } from '../../Models/User.js'
import { getAddressFromCoordinates } from './CurrentLOCATION.js'
export const UpdateAttendance = async (req, res) => {
  const { Email, id, ExitTime, CheckInStatus, location } = req.body
  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })
    if (ExistUser) {
      const address = await getAddressFromCoordinates(
        location.latitude,
        location.longitude
      )
      // Fetch the attendance record by the provided ID
      const attendanceRecord = await AttendanceModel.findById(id)
      // If no record is found with the given ID, return a 404 error
      if (!attendanceRecord) {
        return res.status(404).json({ message: 'Attendance record not found' })
      }
      // Extract entry time from the attendance record
      const entryTime = new Date(attendanceRecord.entry) // Assuming entry is stored as ISO date string
      // Convert ExitTime from the request to a Date object
      const exitTime = new Date(ExitTime)
      // Calculate the time difference in milliseconds
      const timeDifferenceMillis = exitTime - entryTime
      // Convert milliseconds to hours
      const hoursWorked = timeDifferenceMillis / (1000 * 60 * 60)
      // Update the attendance record with the new exit time and check-in status
      const updatedAttendance = await AttendanceModel.findByIdAndUpdate(
        id,
        {
          exit: ExitTime,
          CheckInStatus: CheckInStatus,
          Hours_Worked: hoursWorked,
          location: address,
          latitude: location.latitude,
          longitude: location.longitude,
        },
        { new: true } // This returns the updated document
      )
      // Respond with success message and the updated attendance data
      return res.status(200).json({
        message: 'Attendance updated successfully',
        attendance: updatedAttendance,
        hoursWorked: hoursWorked, // Include the calculated hours worked in the response
      })
    } else {
      // If user doesn't exist, respond with 404
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    // Catch any errors and return a 500 status code
    return res.status(500).json({ message: error.message })
  }
}
