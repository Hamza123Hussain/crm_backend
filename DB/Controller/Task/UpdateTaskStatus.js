import TaskBoard from '../../Models/TaskBoard.js'

// ✅ Update a task by ID and handle completedAt
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.query
    const { status } = req.body

    if (!id) {
      return res.status(400).json({ message: 'Task ID is required' })
    }

    // Prepare update object
    const updateData = {}
    if (status) {
      updateData.status = status
      if (status === 'Completed') {
        updateData.completedAt = new Date() // set completed date
      }
    }

    const updatedTask = await TaskBoard.findByIdAndUpdate(id, updateData, {
      new: true,
    })

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
