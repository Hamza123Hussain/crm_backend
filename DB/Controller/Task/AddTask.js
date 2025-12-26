import TaskBoard from '../../Models/TaskBoard.js'

// ✅ Create a new task
export const addTask = async (req, res) => {
  try {
    const { description, createdBy, email } = req.body
    if (!description || !createdBy || !email) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    const task = await TaskBoard.create({ description, createdBy, email })
    return res.status(201).json({ message: 'Task created', task })
  } catch (error) {
    console.error('Error creating task:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
