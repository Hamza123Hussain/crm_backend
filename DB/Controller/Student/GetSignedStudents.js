import { Student } from '../../Models/Student.js'
export const GetSignedUpStudents = async (req, res) => {
  // const { email } = req.body // Corrected to match the field name in the request body
  try {
    // Check if the user exists by email (Signed up user check)
    // const existingUser = await User.findOne({ email })
    // if (!existingUser) {
    //   return res
    //     .status(400)
    //     .json({ message: 'Only signed-up users can access this' })
    // }
    // Fetch all students with studentTag 'NEW'
    const SignedUp = await Student.find({ studentTag: 'SIGNED UP' })
    // Check if there are any 'NEW' students
    if (SignedUp.length === 0) {
      return res.status(404).json({ message: 'No new students found' })
    }
    // Return the found students
    return res.status(200).json({ SignedUp })
  } catch (error) {
    // Log the error and return a generic server error response
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
