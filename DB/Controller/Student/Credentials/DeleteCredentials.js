import { Student } from '../../../Models/Student.js'

export const DeleteCredentials = async (req, res) => {
  try {
    // Extract student ID and credential ID from the request query
    const { studentId, CredentialID } = req.query

    // Step 1: Find the student by ID
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Step 2: Ensure the student has credentials field
    if (!student.Credentials) {
      return res.status(404).json({ message: 'Credentials record not found' })
    }

    // Step 3: Store the original length to verify if deletion happens
    const originalLength = student.Credentials.length

    // Step 4: Filter out the credential to be deleted
    student.Credentials = student.Credentials.filter(
      (credential) => credential._id.toString() !== CredentialID
    )

    // Step 5: Check if a credential was actually removed
    if (student.Credentials.length === originalLength) {
      return res
        .status(404)
        .json({ message: 'Credential with specified ID not found' })
    }

    // Step 6: Mark the Credentials array as modified
    student.markModified('Credentials')

    // Step 7: Save the updated student document
    await student.save()

    // Step 8: Send a success response
    return res
      .status(200)
      .json({ message: 'Credentials record deleted successfully' })
  } catch (error) {
    // Catch any unexpected errors
    console.error('Error deleting Credentials details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
