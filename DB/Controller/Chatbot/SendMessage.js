import { Student } from '../../Models/Student.js'

// Chatbot handler function
export const Messageme = async (req, res) => {
  try {
    // Extract the user's message from the request body
    const { message } = req.body

    // Parse the user's message to identify intent (e.g., asking about a student's status)
    const lowerCaseMessage = message.toLowerCase()

    // Variable to hold the chatbot's response
    let response = ''

    // Check if the user is asking about a specific student's status
    if (lowerCaseMessage.includes('status of student')) {
      // Extract the student name from the message
      const studentName = extractEntityFromMessage(message, 'name') // Custom function to extract name

      // Query the database for the student by name
      const student = await Student.findOne({ name: studentName })

      // Check if the student exists in the database
      if (student) {
        // Respond with the student's status
        response = `The status for ${student.name} is: ${student.status.join(
          ', '
        )}`
      } else {
        // Respond if no student is found
        response = `No student found with the name "${studentName}".`
      }
    }
    // Check if the user is asking for all students with a specific status
    else if (lowerCaseMessage.includes('students with status')) {
      // Extract the status type from the message
      const statusType = extractEntityFromMessage(message, 'status') // Custom function to extract status

      // Query the database for all students with the specified status
      const students = await Student.find({ status: statusType })

      // Check if any students are found with the specified status
      if (students.length > 0) {
        // Generate a list of student names with the matching status
        const studentNames = students.map((student) => student.name).join(', ')
        response = `Students with the status "${statusType}" are: ${studentNames}`
      } else {
        // Respond if no students are found with the specified status
        response = `No students found with the status "${statusType}".`
      }
    }
    // Default response if the query doesn't match the expected formats
    else {
      response = `I didn't understand your query. Please ask about the status of a specific student or students with a specific status.`
    }

    // Respond to the user with the generated response
    res.status(200).json({ message: response })
  } catch (error) {
    // Log the error to the console for debugging
    console.error('Error:', error)

    // Respond with a generic error message
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Utility function to extract entities (e.g., name or status) from the user's message
function extractEntityFromMessage(message, entityType) {
  // Use simple string parsing or regex to extract entities based on context
  // Example: If the entityType is 'name', extract the student's name from the message
  if (entityType === 'name') {
    // Assuming the name is enclosed in quotes, extract it using regex
    const nameMatch = message.match(/status of student\s+"([^"]+)"/i)
    return nameMatch ? nameMatch[1] : null
  } else if (entityType === 'status') {
    // Assuming the status is enclosed in quotes, extract it using regex
    const statusMatch = message.match(/students with status\s+"([^"]+)"/i)
    return statusMatch ? statusMatch[1] : null
  }

  // Return null if no match is found
  return null
}
