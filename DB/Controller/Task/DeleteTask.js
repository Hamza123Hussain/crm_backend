import TaskBoard from '../../Models/TaskBoard.js'

// ✅ Delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.query

    const task = await TaskBoard.findByIdAndDelete(id)
    if (!task) return res.status(404).json({ message: 'Task not found' })

    return res.status(200).json({ message: 'Task deleted', task })
  } catch (error) {
    console.error('Error deleting task:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
