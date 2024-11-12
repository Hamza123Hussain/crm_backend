import { TaskModel } from '../../Models/Task.js'
import { User } from '../../Models/User.js'

export const DeleteTask = async (req, res) => {
  const { Email, id } = req.query
  try {
    // Check if the user exists
    const UserExist = await User.findOne({ Email })
    if (UserExist) {
      // Delete the task by ID
      const Delete_Single_Task = await TaskModel.findByIdAndDelete(id)
      if (!Delete_Single_Task) {
        return res.status(404).json({ message: 'Task not found' })
      }
      return res.status(200).json({ message: 'Task deleted successfully' })
    } else {
      return res.status(404).json({ message: 'User does not exist' })
    }
  } catch (error) {
    console.error('Error deleting task:', error)
    return res
      .status(500)
      .json({ message: 'An error occurred while deleting the task' })
  }
}
