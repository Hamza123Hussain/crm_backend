import { v4 as uuidv4 } from 'uuid'
import { chatSessions } from '../../../GemniConfig.js'

const sessions = {} // In-memory storage for sessions

export const Messageme = async (req, res) => {
  try {
    const { message } = req.body

    // Generate a unique session ID if not present in cookies
    let sessionId = req.cookies?.sessionId
    if (!sessionId) {
      sessionId = uuidv4() // Generate a new session ID
      res.cookie('sessionId', sessionId, { httpOnly: true, maxAge: 3600000 }) // Set cookie with a 1-hour expiry
    }

    // Initialize conversation history for the session if not already present
    if (!sessions[sessionId]) {
      sessions[sessionId] = []
    }

    // Construct the prompt to send to Gemini API (no prior conversation history)
    const ChatbotPrompt = `
      You are a helpful assistant. Please answer the following question based on your knowledge:
      ${message}
    `

    // Send the prompt to Gemini API and await the response
    const Gemni_Response = await chatSessions.sendMessage(ChatbotPrompt)
    const ChatbotReply = Gemni_Response.response.text()

    // Optionally, store the conversation history (if you want to allow history for future requests)
    sessions[sessionId].push({ role: 'user', content: message })
    sessions[sessionId].push({ role: 'assistant', content: ChatbotReply })

    // Respond with the chatbot reply
    res.status(200).json({ message: ChatbotReply })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    })
  }
}
