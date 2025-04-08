import Notifications from '../../Models/Notifications.js'

export const CreateNotification = async (req, res) => {
  const { StudentName, StudentID, StudentTag } = req.body
  try {
    // Create a new notification
    const newNotification = new Notifications({
      StudentName,
      StudentID,
      StudentTag,
    })
    await newNotification.save()
    res.status(201).json({
      message: `Notification for student '${StudentName}' created successfully.`,
      notification: newNotification,
    })
  } catch (error) {
    console.error('Error creating notification:', error)
    res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
