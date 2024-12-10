import { chatSessions } from '../../../GemniConfig.js'
import { fetchAllStudentData } from './StudentInfo.js'

export const Messageme = async (req, res) => {
  try {
    const { message } = req.body

    // Fetch all student data from the database
    const allStudentData = await fetchAllStudentData()

    // // Simplify the data context
    // const simplifiedData = allStudentData.map((student) => ({
    //   Name: student.Name,
    //   Email: student.Email,
    //   Status: student.Status,
    // }))

    // Construct Gemini prompt
    const chatbotPrompt = `
      You are a CRM assistant for an education consultancy. Below is the student database:

      ${JSON.stringify(allStudentData, null, 2)}

      Answer user queries strictly based on this information.
    `

    const fullPrompt = `
      ${chatbotPrompt}

      User Query: ${message}
    `

    // Send the prompt to Gemini API
    const Gemni_Response = await chatSessions.sendMessage(fullPrompt)

    // Explicitly extract the response text
    const geminiResponseText = Gemni_Response.response.text()

    res
      .status(200)
      .json({ message: geminiResponseText || 'No valid response received' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    })
  }
}
