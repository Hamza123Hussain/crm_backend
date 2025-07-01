import { MeetingReminderModel } from '../../../Models/Reminders.js'
// 🔴 Delete a specific meeting
export const DeleteMeetingReminder = async (req, res) => {
  try {
    const { reminderid } = req.query

    const MeetingReminder = await MeetingReminderModel.findById(reminderid)
    if (!MeetingReminder) {
      return res.status(404).json({ message: 'MeetingReminder not found' })
    }

    return res.status(200).json({ message: 'Meeting deleted successfully' })
  } catch (error) {
    console.error('Error deleting meeting:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
