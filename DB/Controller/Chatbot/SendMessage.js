// import { v4 as uuidv4 } from 'uuid' // Import UUID properly
import { chatSessions } from '../../../GemniConfig.js'
import { Message } from '../../Models/Message.js'
import { User } from '../../Models/User.js'
import { fetchAllStudentData } from './StudentInfo.js'
export const Messageme = async (req, res) => {
  try {
    const { message, Email } = req.body
    if (!message) {
      return res.status(400).json({ message: 'No message provided' })
    }
    const ExisitngUser = await User.findOne({ Email })
    if (ExisitngUser) {
      await Message.create({
        Name: ExisitngUser.Name,
        Role: 'User',
        Message: message,
      })
      const allStudentData = await fetchAllStudentData()
      const chatbotPrompt = `
        You are a CRM assistant for an education consultancy. Below is the student database:
        ${JSON.stringify(
          allStudentData,
          null,
          2
        )}  // Format the student data in a readable JSON format.

        Answer user queries strictly based on this information.
      `
      const fullPrompt = `
        ${chatbotPrompt}  // Insert the constructed chatbot prompt.
        User Query: ${message}  // Append the user's query to the prompt.
      `
      const Gemni_Response = await chatSessions.sendMessage(fullPrompt)
      const geminiResponseText =
        (Gemni_Response?.response?.text && Gemni_Response.response.text()) ||
        (Gemni_Response?.response && JSON.stringify(Gemni_Response.response)) ||
        'No valid response received'
      if (geminiResponseText) {
        await Message.create({
          Name: 'BOT',
          Role: 'BOT',
          Message: geminiResponseText,
        })
        return res.status(200).json({ message: geminiResponseText })
      }
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    })
  }
}
