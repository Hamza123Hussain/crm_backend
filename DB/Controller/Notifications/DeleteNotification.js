import Notifications from '../../Models/Notifications.js'

export const DeleteNotification = async (req, res) => {
  const { ID } = req.body
  try {
    // Find and delete the notification by ID
    const deletedNotification = await Notifications.findByIdAndDelete(ID)
    if (!deletedNotification) {
      return res.status(404).json({
        message: `Notification for student with ID '${ID}' not found.`,
      })
    }
    res.status(200).json({
      message: `Notification for student with ID '${ID}' deleted successfully.`,
      notification: deletedNotification,
    })
  } catch (error) {
    console.error('Error deleting notification:', error)
    res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
