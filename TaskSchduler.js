// ./api/run-tasks.js
import { Router } from 'express'
import TaskBoard from './DB/Models/TaskBoard.js'

const router = Router()
// ------------------------
// Daily tasks (Mon-Fri, due today)
// ------------------------
const dailyTasks = [
  {
    name: 'Global Grads Stories',
    description: 'A Story to be posted on Instagram',
    assignedTo: 'Saad Ali',
    priority: 'Low',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
  },
]

// ------------------------
// Weekly tasks with frequency
// ------------------------
// Weekly tasks (every Monday, due 7 days from now)
const weeklyTasks = [
  {
    name: 'Octtoppus Stories',
    description: 'A Story to be posted on Instagram',
    assignedTo: 'Saad Ali',
    priority: 'Low',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
    frequency: 3,
  },
  {
    name: 'Weekly Data Arrangement',
    description: '',
    assignedTo: 'Saad Ali',
    priority: 'High',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
    frequency: 1,
  },
  {
    name: 'PowerPulse Stories',
    description: 'A Story to be posted on Instagram',
    assignedTo: 'Saad Ali',
    priority: 'Low',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
    frequency: 3,
  },
  {
    name: 'Blogs Octtoppus',
    description: 'A Blog to be posted on Octtoppus Website',
    assignedTo: 'Hamza Hussain',
    priority: 'High',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
    frequency: 3,
  },
  {
    name: 'Linkedin GG',
    description: 'Promote Blog on Linkedin',
    assignedTo: 'Hamza Hussain',
    priority: 'Low',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
    frequency: 3,
  },
  {
    name: 'Website Backup',
    description: 'All Websites Backup on OneDrive and Gdrive',
    assignedTo: 'Hamza Hussain',
    priority: 'Medium',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
    frequency: 1,
  },
  {
    name: 'Blogs Global Grads',
    description: 'Blog To Be Posted on Global Grads Website',
    assignedTo: 'Hamza Hussain',
    priority: 'High',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
    frequency: 3,
  },
]
// ------------------------
// Helper Functions
// ------------------------

// ------------------------
// Helpers
// ------------------------
const getFridayOfWeek = () => {
  const now = new Date()
  const day = now.getDay()
  const diff = (5 - day + 7) % 7
  const friday = new Date(now)
  friday.setDate(now.getDate() + diff)
  friday.setHours(23, 59, 59, 999)
  return friday
}

const createTask = async (task, isWeekly = false) => {
  const dueDate = isWeekly ? getFridayOfWeek() : new Date()

  // prevent duplicates
  const exists = await TaskBoard.findOne({
    name: task.name,
    dueDate,
  })

  if (exists) return

  await TaskBoard.create({
    ...task,
    completed: false,
    dueDate,
  })
}

const frequencyDays = {
  1: [1],
  2: [1, 3],
  3: [1, 3, 5],
}

// ------------------------
// ROUTE CALLED BY EXTERNAL CRON
// ------------------------
router.post('/run', async (req, res) => {
  try {
    const today = new Date()
    const day = today.getDay() // 0=Sun

    // Daily (Mon–Fri)
    if (day >= 1 && day <= 5) {
      for (const task of dailyTasks) {
        await createTask(task)
      }
    }

    // Weekly (frequency-based)
    for (const task of weeklyTasks) {
      const days = frequencyDays[task.frequency] || [1]
      if (days.includes(day)) {
        await createTask(task, true)
      }
    }

    res.json({ success: true, message: 'Tasks executed successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
})

export default router
