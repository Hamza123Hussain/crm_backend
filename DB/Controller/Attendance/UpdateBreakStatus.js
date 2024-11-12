import { AttendanceModel } from '../../Models/Attendance.js'
import { User } from '../../Models/User.js'
export const UpdateBreak = async (req, res) => {
  const { Email, id, Break_Time, onBreak } = req.body
  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })
    if (!ExistUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    // Create an object to hold the fields that need to be updated
    const updateFields = { onBreak: !onBreak } // Always include onBreak
    let breakDuration = 0 // Initialize breakDuration
    // Include Break_Start if onBreak is true (starting a break)
    if (!onBreak) {
      updateFields.breakStart = Break_Time
    }
    // Include Break_End and calculate break time if onBreak is false (ending a break)
    if (onBreak) {
      updateFields.breakEnd = Break_Time
      // Retrieve the attendance record to get the breakStart
      const attendanceRecord = await AttendanceModel.findById(id)
      if (!attendanceRecord) {
        return res.status(404).json({ message: 'Attendance record not found' })
      }
      // Calculate the break duration (difference between breakEnd and breakStart)
      const breakStart = new Date(attendanceRecord.breakStart)
      const breakEnd = new Date(Break_Time)
      breakDuration = (breakEnd - breakStart) / 1000 / 60 / 60 // Convert from milliseconds to hours

      // Update the total breakTime in the attendance record
      updateFields.Break_Time =
        (attendanceRecord.Break_Time || 0) + breakDuration
    }
    // Update the attendance record by the provided id
    const updatedAttendance = await AttendanceModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // This returns the updated document
    )
    // If no record is found with the given ID, return a 404 error
    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' })
    }
    // Respond with success message and the updated attendance data
    return res.status(200).json({
      message: 'Attendance updated successfully',
      attendance: updatedAttendance,
      breakDuration, // Return the calculated break duration
    })
  } catch (error) {
    // Catch any errors and return a 500 status code
    return res.status(500).json({ message: error.message })
  }
}
