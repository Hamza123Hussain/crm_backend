import Notifications from './DB/Models/Notifications.js'
import { Student } from './DB/Models/Student.js'

export const createNotificationsForRecentStudents = async (req, res) => {
  try {
    // 📅 Define start date (18 June)
    const startDate = new Date('2025-06-14T00:00:00Z') // Change year if needed

    // 🔍 Find all students created on or after 18th June
    const students = await Student.find({
      createdAt: { $gte: startDate },
    })

    if (!students.length) {
      return res
        .status(404)
        .json({ message: 'No students found since 18th June.' })
    }

    // 🔁 Create notifications for each student
    for (const student of students) {
      await Notifications.create({
        StudentName: student.name,
        StudentID: student._id, // Assuming _id is used as StudentID
        StudentTag: student.studentTag,
        NotificationType: 'New', // or "Update", based on your context
        FormFilledOn: student.formFilledOn || student.createdAt, // Use a specific field or fallback
      })
    }

    res.status(200).json({
      message: `Created notifications for ${students.length} students.`,
    })
  } catch (error) {
    console.error('Error creating notifications:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
