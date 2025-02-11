import { LogModel } from '../../Models/Logs.js'

// ✅ Function to create a log entry
export const CreateLog = async (req, userId, Name, Email, action) => {
  try {
    // Get the user's IP address
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    // Get device/browser information from user-agent header
    const deviceInfo = req.headers['user-agent'] || 'Unknown Device'
    // ✅ Create the log entry
    const logEntry = new LogModel({
      userId,
      username: Name,
      Email,
      action, // Example: 'signup', 'login', 'logout'
      ipAddress,
      deviceInfo,
      timestamp: new Date(), // Optional: add a timestamp
    })

    // ✅ Save the log entry to the database
    await logEntry.save()

    console.log('✅ User activity logged successfully.')
    return true // To indicate success
  } catch (error) {
    console.error('❌ Error creating log:', error)
    return false // To indicate failure
  }
}
