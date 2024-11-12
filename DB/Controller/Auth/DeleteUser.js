import { User } from '../../Models/User.js'

export const DeleteUser = async (req, res) => {
  const { Email } = req.query // Assume Email is passed as a query parameter

  try {
    // Find the user by email and delete
    const deletedUser = await User.findOneAndDelete({ Email })

    // Check if the user was found and deleted
    if (deletedUser) {
      return res
        .status(200)
        .json({ message: 'User deleted successfully', user: deletedUser })
    } else {
      return res.status(404).json('No User Found')
    }
  } catch (error) {
    console.error(error) // Log the error for debugging
    return res
      .status(500)
      .json({ message: 'An error occurred while deleting the user', error })
  }
}
