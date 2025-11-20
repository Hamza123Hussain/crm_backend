import { Student } from '../../../Models/Student.js'

export const UpdateCredentials = async (req, res) => {
  try {
    // Extract student ID and credential ID from the request query
    const { studentId, CredentialID } = req.query

    // Extract credential fields from the request body
    const {
      UniversityName,
      UniversityLink,
      CourseName,
      Email,
      Password,
      AddedBy,
    } = req.body

    // Step 1: Find the student by ID
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Step 2: Find the specific credential by comparing ObjectId (converted to string)
    const Credential = student.Credentials.find(
      (credential) => credential._id.toString() === CredentialID
    )
    if (!Credential) {
      return res.status(404).json({ message: 'Credential record not found' })
    }

    // Step 3: Update credential fields
    Credential.UniversityName = UniversityName
    Credential.CourseName = CourseName
    Credential.UniversityLink = UniversityLink
    Credential.AddedBy = AddedBy
    Credential.Email = Email
    Credential.Password = Password

    // Step 4: Save the updated student document
    await student.save()

    // Step 5: Send a success response
    return res.status(200).json({
      message: 'Credential record updated successfully',
      Credentials: student.Credentials,
    })
  } catch (error) {
    // Catch any unexpected errors
    console.error('Error updating Credential details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
