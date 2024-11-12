import { TaskModel } from '../../Models/Task.js'
import { User } from '../../Models/User.js'
import { calculateTaskCompletion } from './Task_Calculation.js'

export const TaskUpdated = async (req, res) => {
  const { id, Email, progress, description, priority } = req.body
  try {
    const UserExist = await User.findOne({ Email })
    if (UserExist) {
      const TaskExist = await TaskModel.findById(id)
      if (!TaskExist) {
        return res.status(404).json({ message: 'Task not found' })
      }

      // Before updating the task, calculate TaskCompletion
      const calculatedTaskCompletion = calculateTaskCompletion(
        progress,
        priority
      )

      // Update the total PointsGained for the user based on the task completion
      const pointsToAdd =
        (calculatedTaskCompletion / 100) * TaskExist.TotalPoints // Assuming TaskExist has PointsGained

      // Update the task with the new calculated TaskCompletion
      const TaskUpdated = await TaskModel.findByIdAndUpdate(
        id,
        {
          progress,
          description,
          priority,
          TaskCompletion: calculatedTaskCompletion,
          PointsGained: pointsToAdd,
        },
        { new: true } // This returns the updated document
      )

      return res.status(200).json({
        message: 'Task updated successfully',
        task: TaskUpdated,
      })
    } else {
      return res.status(404).json({ message: 'User does not exist' })
    }
  } catch (error) {
    console.error('Error updating task:', error)
    // Return a generic error message to the client
    return res
      .status(500)
      .json({ message: 'An error occurred while updating the task' })
  }
}
