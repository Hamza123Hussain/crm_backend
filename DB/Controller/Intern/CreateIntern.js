import Intern from '../../Models/Intern.js'
export const CreateIntern = async (req, res) => {
  try {
    // Destructure the intern data from the request body
    const { InternData } = req.body
    // Create a new intern
    const newIntern = new Intern(InternData)
    // Save the new intern to the database
    await newIntern.save()
    // Send a success response with the created intern data
    res.status(201).json({
      message: 'Intern created successfully',
      intern: newIntern,
    })
  } catch (error) {
    // Log the error and send an error response
    console.error('Error creating intern:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message, // Return the specific error message
    })
  }
}
