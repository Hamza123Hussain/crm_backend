import { Student } from '../../Models/Student.js'
import { User } from '../../Models/User.js'

export const UpdateDocumentList = async (req, res) => {
  const { documentname, userid, studentid } = req.body
  // documentname: The specific document to update (e.g., 'CV', 'IELTS6Bands')
  // userid: ID of the user performing the update
  // studentid: ID of the student whose document checklist will be updated

  try {
    // Step 1: Verify if the user exists
    const UserExist = await User.findOne({ _id: userid })
    if (!UserExist) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Step 2: Find the student by ID
    const existingStudent = await Student.findOne({ _id: studentid })
    if (!existingStudent) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Step 3: Check if the DocumentCheckList exists for the student
    if (
      !existingStudent.studentTag !== 'SIGNED UP' ||
      !existingStudent.DocumentCheckList ||
      !(documentname in existingStudent.DocumentCheckList)
    ) {
      return res.status(400).json({ message: 'Invalid document name provided' })
    }

    // Step 4: Update the document status to "true" (indicating submission)
    existingStudent.DocumentCheckList[documentname] = true

    // Step 5: Save the updated student record
    await existingStudent.save()

    // Step 6: Send a success response
    return res.status(200).json({
      message: `Document '${documentname}' has been marked as submitted.`,
      DocumentCheckList: existingStudent.DocumentCheckList,
    })
  } catch (error) {
    console.error('Error updating document checklist:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
