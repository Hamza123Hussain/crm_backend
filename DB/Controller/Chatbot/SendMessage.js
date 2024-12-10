// Importing required modules. `chatSessions` contains the logic to interact with Gemini API,
// and `fetchAllStudentData` fetches student data from the database.
import { v4 } from 'uuid'
import { chatSessions } from '../../../GemniConfig.js'
import { Message } from '../../Models/Message.js'
import { User } from '../../Models/User.js'
import { fetchAllStudentData } from './StudentInfo.js'
// Define the main function that handles the incoming message and sends it to Gemini for processing
export const Messageme = async (req, res) => {
  try {
    // Destructuring to extract the message from the request body.
    // `req.body` contains the incoming data sent by the frontend.
    const { message, Email } = req.body

    // If no message is provided, send a 400 status code and a message indicating that no message was provided
    if (!message) {
      return res.status(400).json({ message: 'No message provided' })
    }
    const ExisitngUser = await User.find({ Email })
    if (ExisitngUser) {
      await Message.create({
        _id: v4(),
        Name: ExisitngUser.Name,
        Role: 'User',
        Message: message,
      })
      // Fetch all student data from the database using the `fetchAllStudentData` function.
      // This will return all student data, which will be used to answer the user's query.
      const allStudentData = await fetchAllStudentData()
      // Construct a prompt for the Gemini chatbot, explaining its role and providing the student data.
      // The data is stringified into a readable format.
      const chatbotPrompt = `
      You are a CRM assistant for an education consultancy. Below is the student database:
      ${JSON.stringify(
        allStudentData,
        null,
        2
      )}  // Format the student data in a readable JSON format.

      Answer user queries strictly based on this information.
    `
      // Combine the chatbot prompt and the user's query to form the full prompt.
      // This prompt is what will be sent to Gemini to generate a response.
      const fullPrompt = `
      ${chatbotPrompt}  // Insert the constructed chatbot prompt.
      User Query: ${message}  // Append the user's query to the prompt.
    `
      // Send the full prompt to the Gemini API using `chatSessions.sendMessage()`.
      // This function will send the request to Gemini and wait for the response.
      const Gemni_Response = await chatSessions.sendMessage(fullPrompt)
      // Assuming that `Gemni_Response.response.text()` returns the Gemini response text,
      // or it may directly be an object or string, so we check both ways.
      // If no valid response is received, fallback to the default string.
      const geminiResponseText =
        Gemni_Response.response.text() || // Check if the response has a `text()` method (some APIs might return a method).
        Gemni_Response.response || // If no `text()` method exists, use the direct response.
        'No valid response received' // Default message if no valid response is found.
      // Send the response back to the client (frontend).
      // The `message` key will contain the response text from Gemini or the fallback message.
      if (geminiResponseText) {
        await Message.create({
          _id: v4(),
          Name: 'BOT',
          Role: 'BOT',
          Message: geminiResponseText,
        })
        res.status(200).json({ message: geminiResponseText })
      }
    }
  } catch (error) {
    // In case of any error, log it to the console for debugging purposes.
    // Send a 500 status code indicating an internal server error along with the error message.
    console.error('Error:', error)
    res.status(500).json({
      status: 'error', // Indicate an error status.
      message: 'Internal server error', // A generic error message.
      error: error.message, // Include the specific error message for debugging.
    })
  }
}
