import { Student } from '../../Models/Student.js'
import { User } from '../../Models/User.js'
export const GetPaymentStudents = async (req, res) => {
  const { UserEmail } = req.query
  try {
    const SingleUser = await User.findOne({ Email: UserEmail })
    if (!SingleUser) {
      return res.status(404).json({ message: 'No Found With This ID' })
    }
    // Fetch all students with studentTag 'NEW'
    const SingleStudent = await Student.find({
      'PaymentCheckList.FirstInstallmentPaid': true,
    })
    // Check if there are any 'NEW' students
    if (!SingleStudent) {
      return res.status(404).json({ message: 'No Found With This ID' })
    }
    // Return the found students
    return res.status(200).json(SingleStudent)
  } catch (error) {
    // Log the error and return a generic server error response
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
