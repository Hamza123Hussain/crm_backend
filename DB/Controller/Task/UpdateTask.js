import TaskBoard from '../../Models/TaskBoard.js'

// ✅ Update a task by ID
export const updateTask = async (req, res) => {
  try {
    const { id } = req.query
    const { description } = req.body
    if (!description) {
      return res.status(400).json({ message: 'Description is required' })
    }

    const task = await TaskBoard.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    )

    if (!task) return res.status(404).json({ message: 'Task not found' })

    return res.status(200).json({ message: 'Task updated', task })
  } catch (error) {
    console.error('Error updating task:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
