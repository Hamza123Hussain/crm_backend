import { Student } from '../../Models/Student.js'
export const GetOptionDetails = async (req, res) => {
  const { StudentId } = req.query
  try {
    // Fetch all students with studentTag 'NEW'
    const RetrieveStudentOptions = await Student.findOne({
      _id: StudentId,
    }).select('options optionspresented updatedBy updatedAt')
    // Check if there are any 'NEW' students
    if (!RetrieveStudentOptions) {
      return res.status(404).json({ message: 'No Found With This ID' })
    }
    // Return the found students
    return res.status(200).json(RetrieveStudentOptions)
  } catch (error) {
    // Log the error and return a generic server error response
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
