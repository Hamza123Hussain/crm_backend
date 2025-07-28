import { Student } from '../../Models/Student.js'

export const UpdateStudentConsentForm = async (req, res) => {
  const { studentId } = req.query
  const { consentform } = req.body // Assuming the Progress object has ProgressName and Completion
  try {
    // Check if the student exists
    const existingStudent = await Student.findById(studentId)
    if (!existingStudent) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Update the specific progress item in the array
    existingStudent.ConsentForm = consentform
    // Save the updated student
    const updatedStudent = await existingStudent.save()
    // Check if the update was successful
    if (!updatedStudent) {
      return res
        .status(500)
        .json({ message: 'Failed to update student progress' })
    }
    // Return the updated student data
    return res.status(200).json({
      message: 'Student progress updated successfully',
      updatedStudent,
    })
  } catch (error) {
    // Log the error and return a generic error message
    console.error('Error updating student progress:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
