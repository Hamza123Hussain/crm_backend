import { TaskModel } from '../../Models/Task.js'
import { User } from '../../Models/User.js'

export const GetSingleTask = async (req, res) => {
  const { Email, taskId } = req.query // Assuming you pass both Email and taskId as query parameters

  try {
    // Check if the user exists
    const UserExist = await User.findOne({ Email })
    if (!UserExist) {
      return res.status(404).json({ message: 'User does not exist' })
    }

    // Retrieve the specific task for the user
    const task = await TaskModel.findOne({
      _id: taskId,
      // assignedTo: UserExist.Name,
    }) // Ensure that the task belongs to the user
    if (!task) {
      return res.status(404).json({ message: 'Task not found for this user' })
    }

    return res
      .status(200)
      .json({ message: 'Task retrieved successfully', task })
  } catch (error) {
    console.error('Error retrieving task:', error)
    return res
      .status(500)
      .json({ message: 'An error occurred while retrieving the task' })
  }
}
