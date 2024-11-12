import { User } from '../../Models/User.js'

export const GetUser = async (req, res) => {
  const { Email } = req.query

  try {
    const UserExists = await User.findOne({ Email })
    if (UserExists) {
      return res.status(200).json(UserExists)
    } else {
      return res.status(404).json('No User Found')
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}
