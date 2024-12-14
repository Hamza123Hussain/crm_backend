import Intern from '../../Models/Intern.js'
export const UpdateIntern = async (req, res) => {
  const { id, status } = req.body
  try {
    // Find the intern by ID and update their status
    const updatedIntern = await Intern.findByIdAndUpdate(
      id,
      { status },
      { new: true } // This will return the updated document
    )
    // If the intern with the given ID is not found, return a 404 message
    if (!updatedIntern) {
      return res.status(404).json({ message: 'Intern not found' })
    }

    // Respond with the updated intern details
    res.status(200).json(updatedIntern)
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error updating intern:', error)
    // Send an error response
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message, // Return the specific error message
    })
  }
}
