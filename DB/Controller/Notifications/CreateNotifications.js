import Notifications from '../../Models/Notifications.js'
import { Student } from '../../Models/Student.js'

export const CreateNotification = async (req, res) => {
  const { StudentName, StudentID, StudentTag, NotificationType } = req.body

  try {
    const ExisitingStudent = await Student.findOne({ _id: StudentID })
    if (!ExisitingStudent) {
      return res.status(404).json({ message: 'Student not found.' })
    }

    // 🔍 Check if a similar notification already exists
    const existingNotification = await Notifications.findOne({
      StudentID,
      StudentTag,
      NotificationType,
    })

    if (existingNotification) {
      return res.status(200).json({
        message:
          'Notification already exists for this student with same tag and type.',
        notification: existingNotification,
      })
    }

    // ✅ If no duplicate, create a new notification
    const newNotification = new Notifications({
      StudentName,
      StudentID,
      StudentTag,
      NotificationType,
      FormFilledOn: ExisitingStudent.createdAt,
    })

    await newNotification.save()

    return res.status(201).json({
      message: `Notification for student '${StudentName}' created successfully.`,
      notification: newNotification,
    })
  } catch (error) {
    console.error('Error creating notification:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
