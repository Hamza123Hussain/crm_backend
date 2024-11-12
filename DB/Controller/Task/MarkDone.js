import { TaskModel } from '../../Models/Task.js'
import { User } from '../../Models/User.js'
import { calculateTaskCompletion } from './Task_Calculation.js'

export const MarkDone = async (req, res) => {
  const { id, Email, progress } = req.body
  try {
    const UserExist = await User.findOne({ Email })
    if (!UserExist) {
      return res.status(404).json({ message: 'User does not exist' })
    }

    const TaskExist = await TaskModel.findById(id)
    if (!TaskExist) {
      return res.status(404).json({ message: 'Task not found' })
    }

    // Calculate new TaskCompletion based on the updated progress
    const calculatedTaskCompletion = calculateTaskCompletion(
      progress,
      TaskExist.priority
    )

    // Update only the progress and TaskCompletion fields
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        progress,
        TaskCompletion: calculatedTaskCompletion,
      },
      { new: true } // This returns the updated document
    )

    return res
      .status(200)
      .json({
        message: 'Task progress updated successfully',
        task: updatedTask,
      })
  } catch (error) {
    console.error('Error updating task progress:', error)
    return res
      .status(500)
      .json({ message: 'An error occurred while updating the task progress' })
  }
}
