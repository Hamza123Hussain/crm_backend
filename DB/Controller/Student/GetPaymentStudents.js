import { Student } from '../../Models/Student.js'
import { User } from '../../Models/User.js'

export const GetPaymentStudents = async (req, res) => {
  const { UserEmail } = req.query

  try {
    // Find the user
    const SingleUser = await User.findOne({ Email: UserEmail })
    if (!SingleUser) {
      return res.status(404).json({ message: 'User not found with this email' })
    }

    // Fetch all students where PaymentDone > 0
    const SingleStudent = await Student.find({
      'PaymentCheckList.PaymentDone': { $gt: 0 },
    })

    // Check if any students found
    if (SingleStudent.length === 0) {
      return res
        .status(404)
        .json({ message: 'No students found with payments done' })
    }

    // Return the found students
    return res.status(200).json(SingleStudent)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
