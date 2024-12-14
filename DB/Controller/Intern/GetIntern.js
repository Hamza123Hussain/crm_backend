import Intern from '../../Models/Intern.js'

export const GetIntern = async (req, res) => {
  const { _id } = req.query
  try {
    // Fetch a single intern from the database
    const intern = await Intern.findOne({ _id })

    // If no intern is found, return a message
    if (!intern) {
      return res.status(404).json({ message: 'No intern found' })
    }

    // Respond with the intern details
    res.status(200).json(intern)
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching intern:', error)

    // Send an error response
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message, // Return the specific error message
    })
  }
}
