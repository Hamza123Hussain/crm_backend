import { TaskModel } from '../../Models/Task.js'
import { User } from '../../Models/User.js'

export const UserTasks = async (req, res) => {
  const { Name, Email } = req.query
  try {
    // Check if the user exists
    const UserExist = await User.findOne({ Email })
    if (UserExist) {
      // Retrieve all tasks for the specific user
      const AllTasks = await TaskModel.find({ assignedTo: Name })
      if (AllTasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found for this user' })
      }
      return res
        .status(200)
        .json({ message: 'Tasks retrieved successfully', AllTasks })
    } else {
      return res.status(404).json({ message: 'User does not exist' })
    }
  } catch (error) {
    console.error('Error retrieving tasks:', error)
    return res
      .status(500)
      .json({ message: 'An error occurred while retrieving the tasks' })
  }
}
