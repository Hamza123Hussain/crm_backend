import { Student } from '../../Models/Student.js'

export const UpdatestudentStatusandTag = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from URL
    const { status, updatedBy, studentTag } = req.body // Extract update data from request body
    // Check if the student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // Prepare update object (only update provided fields)
    const updatedFields = {}
    if (status) updatedFields.status = status

    if (studentTag) updatedFields.studentTag = studentTag
    if (updatedBy) updatedFields.updatedBy = updatedBy
    // Update the student document
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $set: updatedFields },
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
