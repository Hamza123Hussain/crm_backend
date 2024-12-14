import Intern from '../../Models/Intern.js'

export const DeleteIntern = async (req, res) => {
  const { id } = req.query // Get the intern ID from request parameters

  try {
    // Find and delete the intern by their ID
    const deletedIntern = await Intern.findByIdAndDelete(id)

    // If no intern was found, return a 404 error
    if (!deletedIntern) {
      return res.status(404).json({ message: 'Intern not found' })
    }

    // Send a success response with the deleted intern data
    res.status(200).json({
      message: 'Intern deleted successfully',
      intern: deletedIntern,
    })
  } catch (error) {
    // Log the error and send an error response
    console.error('Error deleting intern:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message, // Return the specific error message
    })
  }
}
