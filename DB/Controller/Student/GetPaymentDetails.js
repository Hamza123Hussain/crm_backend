import { Student } from '../../Models/Student.js'
export const GetPaymentDetails = async (req, res) => {
  const { StudentId } = req.query
  try {
    // Fetch all students with studentTag 'NEW'
    const SingleStudent = await Student.findOne({ _id: StudentId })
    // Check if there are any 'NEW' students
    if (!SingleStudent) {
      return res.status(404).json({ message: 'No Found With This ID' })
    }
    // Return the found students
    return res.status(200).json(SingleStudent.PaymentCheckList)
  } catch (error) {
    // Log the error and return a generic server error response
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
