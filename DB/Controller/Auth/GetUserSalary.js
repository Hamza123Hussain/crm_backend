import { User } from '../../Models/User.js'

export const GetSalaryUser = async (req, res) => {
  const { Name } = req.query

  try {
    const UserExists = await User.findOne({ Name })
    if (UserExists) {
      return res.status(200).json(UserExists)
    } else {
      return res.status(404).json('No User Found')
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}
