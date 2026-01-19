import TaskBoard from '../../Models/TaskBoard.js'

// ✅ Update a task by ID
export const CompleteTask = async (req, res) => {
  try {
    const { id } = req.query
    const { completed } = req.body

    if (!id) {
      return res.status(400).json({ message: 'Task ID is required' })
    }

    const updatedTask = await TaskBoard.findByIdAndUpdate(
      id,
      {
        ...(completed && { completed }),
      },
      { new: true },
    )

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }

    return res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask,
    })
  } catch (error) {
    console.error('Error updating task:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
