import { AttendanceModel } from '../../Models/Attendance.js'
import { User } from '../../Models/User.js'

export const Break_end = async (req, res) => {
  const { Email, id, Break_end, onBreak } = req.body

  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })

    if (ExistUser) {
      // Fetch the attendance record by the provided ID
      const attendanceRecord = await AttendanceModel.findById(id)

      // If no record is found with the given ID, return a 404 error
      if (!attendanceRecord) {
        return res.status(404).json({ message: 'Attendance record not found' })
      }

      // Log to check if break start exists
      console.log('Break_Start:', attendanceRecord.breakStart)

      // Check if breakStart exists, otherwise return an error
      if (!attendanceRecord.breakStart) {
        return res.status(400).json({
          message: 'Break_Start not found. Cannot calculate break time.',
        })
      }

      // Extract break start time from the attendance record
      const breakStart = new Date(attendanceRecord.breakStart) // Ensure breakStart is properly set
      const breakEnd = new Date(Break_end) // Convert Break_end from the request to a Date object

      // Log the times for debugging
      console.log('Break Start Time:', breakStart)
      console.log('Break End Time:', breakEnd)

      // Calculate the break duration in milliseconds
      const breakDurationMillis = breakEnd - breakStart

      // Log the calculated duration in milliseconds
      console.log('Break Duration (ms):', breakDurationMillis)

      // Check if the duration is valid
      if (breakDurationMillis < 0) {
        return res.status(400).json({
          message: 'Break_end is before Break_Start. Please check the times.',
        })
      }

      // Convert break duration to hours (as a decimal)
      const breakDurationHours = (
        breakDurationMillis /
        (1000 * 60 * 60)
      ).toFixed(2) // Convert milliseconds to hours

      // Log the calculated break duration in hours
      console.log('Break Duration (hours):', breakDurationHours)

      // Update the attendance record with the new break end time and calculated break duration in hours
      const UpdateBreak = await AttendanceModel.findByIdAndUpdate(
        id,
        {
          onBreak,
          breakEnd, // Update the break end time
          Break_Time: breakDurationHours, // Store the calculated break time
        },
        { new: true } // This returns the updated document
      )

      // Respond with success message and the updated attendance data
      return res.status(200).json({
        message: 'Attendance updated successfully',
        attendance: UpdateBreak,
      })
    } else {
      // If user doesn't exist, respond with 404
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    // Log the error to see what's going wrong
    console.error('Error updating break:', error)
    // Catch any errors and return a 500 status code
    return res.status(500).json({ message: error.message })
  }
}
