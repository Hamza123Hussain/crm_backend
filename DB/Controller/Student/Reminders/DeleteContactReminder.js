import { CallReminders } from '../../../Models/CallReminders.js'

export const DeleteContactReminder = async (req, res) => {
  try {
    const { reminderid } = req.query

    const ContactReminder = await CallReminders.findByIdAndDelete(reminderid)
    if (!ContactReminder) {
      return res.status(404).json({ message: 'ContactReminder not found' })
    }

    return res
      .status(200)
      .json({ message: 'Contact Reminder deleted successfully' })
  } catch (error) {
    console.error('Error deleting Contact Reminder:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
