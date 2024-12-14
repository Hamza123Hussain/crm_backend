import Intern from '../../Models/Intern.js'

export const GetInterns = async (req, res) => {
  try {
    // Fetch all interns from the database
    const AllInterns = await Intern.find()

    // If no interns are found, return a message
    if (AllInterns.length === 0) {
      return res.status(404).json({ message: 'No interns found' })
    }

    // Respond with the list of interns
    res.status(200).json(AllInterns)
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching interns:', error)

    // Send an error response
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message, // Return the specific error message
    })
  }
}
