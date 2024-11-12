import { User } from '../../Models/User.js'
export const AllUsers = async (req, res) => {
  const { Email } = req.query
  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })
    if (ExistUser) {
      // Fetch all User Records for the given user's email
      const AllUserss = await User.find() // Assuming you store the email in "UserData"
      // If no records are found, return a 404 error
      if (!AllUserss || AllUserss.length === 0) {
        return res.status(404).json({ message: 'No User Records found' })
      }
      // Respond with success message and the fetched attendance data
      return res.status(200).json(AllUserss)
    } else {
      // If user doesn't exist, respond with 404
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    // Catch any errors and return a 500 status code
    return res.status(500).json({ message: error.message })
  }
}
