import TaskBoard from '../../Models/TaskBoard.js'

// ✅ Create a new task
export const addTask = async (req, res) => {
  try {
    const {
      name,
      description,
      assignedTo,
      priority,
      dueDate,
      createdBy,
      email,
      type,
    } = req.body

    if (!name || !description || !assignedTo || !priority || !dueDate) {
      return res.status(400).json({
        message: 'Missing required fields',
      })
    }

    // Initialize Posting array conditionally
    let posting = []
    const instagramTypes = [
      'PowerPulse Instagram Posts/Reels',
      'Global Grads Instagram Posts/Reels',
      'Octtoppus Instagram Posts/Reels',
    ]

    if (instagramTypes.includes(type)) {
      posting = [
        { Name: 'LinkedIn', Status: false },
        { Name: 'YouTube', Status: false },
        { Name: 'TikTok', Status: false },
      ]
    }

    const task = await TaskBoard.create({
      name,
      description,
      assignedTo,
      priority,
      dueDate,
      createdBy,
      email,
      type,
      completed: false,
      Posting: posting, // Add Posting array
    })

    return res.status(201).json({
      message: 'Task created successfully',
      task,
    })
  } catch (error) {
    console.error('Error creating task:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
