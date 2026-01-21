import TaskBoard from './DB/Models/TaskBoard.js'
import cron from 'node-cron'
// Daily tasks (due today)
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

// Weekly tasks (due 7 days from now)
const weeklyTasks = [
  {
    name: 'Octtoppus Stories',
    description: 'A Story to be posted on Instagram',
    assignedTo: 'Saad Ali',
    priority: 'Low',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
  },
  {
    name: 'Weekly Data Arrangement',
    description: '',
    assignedTo: 'Saad Ali',
    priority: 'High',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
  },
  {
    name: 'PowerPulse Stories',
    description: 'A Story to be posted on Instagram',
    assignedTo: 'Saad Ali',
    priority: 'Low',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
  },
  {
    name: 'Blogs Octtoppus',
    description: 'A Story to be posted on Instagram',
    assignedTo: 'Hamza Hussain',
    priority: 'High',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
  },
  {
    name: 'Linkedin GG',
    description: 'A Story to be posted on Instagram',
    assignedTo: 'Hamza Hussain',
    priority: 'Low',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
  },
  {
    name: 'Website Backup',
    description: 'A Story to be posted on Instagram',
    assignedTo: 'Hamza Hussain',
    priority: 'Medium',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
  },
  {
    name: 'Blogs Global Grads',
    description: 'A Story to be posted on Instagram',
    assignedTo: 'Hamza Hussain',
    priority: 'High',
    createdBy: 'Faheem Butt',
    email: 'globalgrads.org@gmail.com',
  },
]

// ------------------------
// Step 3: Helper function to create a task
// ------------------------
// Helper function to create a task
const createTask = async (task, isWeekly = false) => {
  try {
    const dueDate = isWeekly
      ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      : new Date()
    await TaskBoard.create({
      ...task,
      completed: false,
      dueDate,
    })
    console.log(
      `Task "${task.name}" created successfully. Due: ${dueDate.toDateString()}`,
    )
  } catch (error) {
    console.error('Error creating task:', error)
  }
}

// ------------------------
// TEST: Run tasks 30 minutes from now (Pakistan Time)
// ------------------------

// Calculate current Pakistan time
const now = new Date()
const pakistanOffset = 5 * 60 // PKT is UTC+5
const localUTCOffset = now.getTimezoneOffset() // in minutes
const nowInPKT = new Date(
  now.getTime() + (pakistanOffset + localUTCOffset) * 60 * 1000,
)

// Add 30 minutes
const testTime = new Date(nowInPKT.getTime() + 30 * 60 * 1000)
const minute = testTime.getMinutes()
const hour = testTime.getHours()

console.log(`Test scheduled for ${hour}:${minute} PKT (30 minutes from now)`)

// Schedule cron job for that time
cron.schedule(`${minute} ${hour} * * *`, () => {
  console.log('--- Running test tasks 30 minutes from now ---')
  dailyTasks.forEach((task) => createTask(task))
  weeklyTasks.forEach((task) => createTask(task, true))
})
