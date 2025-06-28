import Notifications from '../../Models/Notifications.js'
import { Student } from '../../Models/Student.js'
export const CreateNotification = async (req, res) => {
  // 📦 Extract required fields from request body
  const { StudentName, StudentID, StudentTag, NotificationType } = req.body
  try {
    // 🔍 Check if the student exists in the database
    const ExisitingStudent = await Student.findOne({ _id: StudentID })
    if (!ExisitingStudent) {
      return res.status(404).json({ message: 'Student not found.' })
    }
    // 🕰️ Get current date/time in Pakistan Standard Time (PKT)
    const now = new Date()
    const currentDateInPK = new Date(
      now.toLocaleString('en-US', { timeZone: 'Asia/Karachi' })
    )
    // 📆 Calculate the start of the current month (1st of month at 00:00:00) in PKT
    const startOfMonth = new Date(
      currentDateInPK.getFullYear(),
      currentDateInPK.getMonth(),
      1
    )
    // 📆 Calculate the end of the current month (last day at 23:59:59.999) in PKT
    const endOfMonth = new Date(
      currentDateInPK.getFullYear(),
      currentDateInPK.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    )
    // 🔍 Check if a similar notification (same student, tag, type) already exists in current PK month
    const existingNotification = await Notifications.findOne({
      StudentID,
      StudentTag,
      NotificationType,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }, // check date range
    })
    // 🚫 If such a notification exists, return a 200 response with existing data (don't create duplicate)
    if (existingNotification) {
      return res.status(200).json({
        message:
          'Notification already exists for this student with same tag and type this month.',
        notification: existingNotification,
      })
    }
    // ✅ No duplicate found — proceed to create a new notification
    const newNotification = new Notifications({
      StudentName,
      StudentID,
      StudentTag,
      NotificationType,
      UpdatedBy: ExisitingStudent.updatedBy,
      FormFilledOn: ExisitingStudent.createdAt, // optional field referencing when form was first filled
    })
    // 💾 Save the new notification to database
    await newNotification.save()
    // ✅ Return success response with the newly created notification
    return res.status(201).json({
      message: `Notification for student '${StudentName}' created successfully.`,
      notification: newNotification,
    })
  } catch (error) {
    // ❌ Handle unexpected server/database errors
    console.error('Error creating notification:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
