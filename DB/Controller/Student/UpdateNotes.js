import { Student } from '../../Models/Student.js'

export const UpdateNotes = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from URL
    const { notes } = req.body // Extract update data from request body
    // Check if the student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // Update the student document
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { notes },
      { new: true } // Return the updated document
    )
    // Return success response
    return res.status(200).json(updatedStudent)
  } catch (error) {
    console.error('Error updating student details:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
