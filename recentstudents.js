// createNotifications.js
import mongoose from 'mongoose'
import Notifications from './DB/Models/Notifications.js'
import { Student } from './DB/Models/Student.js'

const MONGO_URI =
  'mongodb+srv://octtoppus1:OCTTOPPUS1@gg1208crm.dy2kw.mongodb.net/?retryWrites=true&w=majority&appName=GG1208CRM' // 🔹 replace with your DB

// 📌 Function to create notifications
const createNotificationsForRecentStudents = async () => {
  try {
    console.log('📡 Connecting to database...')
    await mongoose.connect(MONGO_URI)

    // 📅 Define July date range
    const startDate = new Date('2026-03-03T00:00:00Z')
    const endDate = new Date('2026-03-04T00:00:59Z')

    console.log('🔍 Fetching students ...')
    const students = await Student.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })

    if (!students.length) {
      console.log('⚠️ No students found in July.')
      return
    }

    console.log(
      `✅ Found ${students.length} students. Creating notifications...`,
    )

    // 🔁 Create notifications in parallel
    const notifications = await Promise.all(
      students.map((student) =>
        Notifications.create({
          StudentName: student.name,
          StudentID: student._id,
          StudentTag: student.studentTag,
          NotificationType: 'New',
          FormFilledOn: student.formFilledOn || student.createdAt,
          createdAt: student.createdAt, // 👈 match notification timestamp to student
          UpdatedBy: 'nijhum.jan24@gmail.com',
        }),
      ),
    )

    console.log(`🎉 Success! Created ${notifications.length} notifications.`)
    process.exit(0) // ✅ Exit when done
  } catch (error) {
    console.error('❌ Error creating notifications:', error)
    process.exit(1) // ❌ Exit with error
  }
}

// Run function directly
createNotificationsForRecentStudents()
