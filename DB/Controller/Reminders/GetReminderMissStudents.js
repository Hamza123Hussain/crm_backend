import { Student } from '../../Models/Student.js'
import { User } from '../../Models/User.js'
export const GetReminderMissStudents = async (req, res) => {
  try {
    const reminderMissStudents = await Student.aggregate([
      {
        $match: {
          ContactReminder: { $ne: null }, // Ensure there is a reminder set
          ContactDetails: { $exists: true, $not: { $size: 0 } }, // Ensure there are contact details
        },
      },
      {
        $project: {
          name: 1, // Adjust field name if it's 'firstName' or 'fullName'
          ContactReminder: 1,
          lastContact: { $last: '$ContactDetails' }, // Get the most recent contact entry
        },
      },
      {
        $match: {
          $expr: {
            $lt: ['$lastContact.ContactedDate', '$ContactReminder'],
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          ContactReminder: 1,
          lastContactDetail: '$lastContact', // Rename for clarity in response
        },
      },
    ])
    // 3. Response handling
    if (reminderMissStudents.length === 0) {
      return res
        .status(404)
        .json({ message: 'No students found with missed reminders' })
    }
    return res.status(200).json({ reminderMissStudents })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
