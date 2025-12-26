import TaskBoard from '../../Models/TaskBoard.js'

export const getTasksGroupedByDate = async (req, res) => {
  try {
    const tasks = await TaskBoard.find({}).sort({ createdAt: -1 })

    // Group by YYYY-MM-DD
    const groupedTasks = tasks.reduce((acc, task) => {
      const dateKey = task.createdAt.toISOString().split('T')[0]
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push(task)
      return acc
    }, {})

    return res.status(200).json({ groupedTasks })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}
