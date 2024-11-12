import { TaskModel } from '../../Models/Task.js'
import { v4 } from 'uuid'

// Function to create a task for a single user
const createTaskForUser = async ({
  name,
  description,
  priority,
  TaskType,
  dueDate,
  assignedTo,
}) => {
  // Set the TotalPoints based on the priority
  let totalPoints = 0
  if (priority === 'HIGH') {
    totalPoints = 10
  } else if (priority === 'MEDIUM') {
    totalPoints = 5
  } else if (priority === 'LOW') {
    totalPoints = 2.5
  }

  // Determine the due date based on TaskType
  if (TaskType === 'Daily') {
    dueDate = new Date() // Set to current date if Daily
  } else if (TaskType === 'Weekly') {
    dueDate = new Date() // Set to current date
    dueDate.setDate(dueDate.getDate() + 7) // Add 7 days for Weekly tasks
  }

  // Create a new task with the provided details
  const task = new TaskModel({
    _id: v4(),
    name,
    description,
    priority,
    TaskType,
    dueDate,
    assignedTo,
    PointsGained: 0, // PointsGained should always be 0 when creating a new task
    TotalPoints: totalPoints, // Set TotalPoints based on the priority
  })

  try {
    // Save the task to the database
    await task.save()
    return task
  } catch (error) {
    console.error('Error saving task for user:', assignedTo, error)
    throw error // Rethrow the error so it can be caught in the controller
  }
}

// Main createTask function (to handle request and response)
export const createTask = async (req, res) => {
  const { name, description, priority, TaskType, dueDate, assignedTo } =
    req.body

  // Check if assignedTo is a single user or an array
  if (Array.isArray(assignedTo)) {
    // If assignedTo is an array, loop through and create a task for each user
    try {
      const taskPromises = assignedTo.map((user) =>
        createTaskForUser({
          name,
          description,
          priority,
          TaskType,
          dueDate,
          assignedTo: user,
        })
      )
      await Promise.all(taskPromises) // Wait for all tasks to be created
      return res
        .status(200)
        .json({ message: 'Tasks created for multiple users' })
    } catch (error) {
      console.error('Error creating tasks for multiple users:', error)
      return res.status(500).json({
        message: 'Error creating tasks for multiple users',
        error: error.message,
      })
    }
  } else {
    // If assignedTo is a single user, create the task for that user
    try {
      await createTaskForUser({
        name,
        description,
        priority,
        TaskType,
        dueDate,
        assignedTo,
      })
      return res.status(200).json({ message: 'Task created for user' })
    } catch (error) {
      console.error('Error creating task for user:', assignedTo, error)
      return res
        .status(500)
        .json({ message: 'Error creating task', error: error.message })
    }
  }
}
