import mongoose from 'mongoose'
import { Student } from './DB/Models/Student.js'
import { User } from './DB/Models/User.js'
import { ContactReminderModel } from './DB/Models/Reminders.js'

// --- CONFIGURATION ---
const MONGO_URI =
  'mongodb+srv://octtoppus1:OCTTOPPUS1@gg1208crm.dy2kw.mongodb.net/?retryWrites=true&w=majority&appName=GG1208CRM'
const ADMIN_NAME = 'Hamza Hussain' // The 'Name' in your User collection
const TARGET_DATE = new Date('2026-02-10')
const STATUS_OPTIONS = ['Contacted', 'No Response']

async function runTask() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGO_URI)

    // 1. Get the admin user's email
    const admin = await User.findOne({ Name: ADMIN_NAME })
    if (!admin) throw new Error(`User "${ADMIN_NAME}" not found in database.`)

    // 2. Fetch 6 random students between 1800 and 1900
    // Using studentId field as per your requirements
    const students = await Student.aggregate([
      { $match: { _id: { $gte: 1800, $lte: 1900 } } },
      { $sample: { size: 14 } },
    ])

    if (students.length === 0) {
      console.log('No students found in the specified range.')
      return
    }

    // 3. Prepare the data
    const reminders = students.map((student) => ({
      _id: new mongoose.Types.ObjectId(),
      UserID: student._id,
      UserName: student.name,
      ContactedDate: TARGET_DATE,
      ResponseStatus:
        STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)],
      FollowUpMessage: true,
      DiscussedWithFamily: false,
      LocationShared: false,
      ContactedTime: '12:00 PM',
      StudentTag: student.studentTag,
      UpdatedBy: 'was6282785@gmail.com',
    }))

    // 4. Insert into DB
    const result = await ContactReminderModel.insertMany(reminders)

    console.log(`--- Success! ---`)
    console.log(`Created ${result.length} reminders for Feb 2nd, 2026.`)
    result.forEach((r) =>
      console.log(`- Student: ${r.UserName} | Status: ${r.ResponseStatus}`),
    )
  } catch (err) {
    console.error('Task failed:', err.message)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed.')
    process.exit()
  }
}

runTask()
