import { Student } from '../../Models/Student.js'
import { User } from '../../Models/User.js'

export const UpdateDocumentList = async (req, res) => {
  const { documentList, Email, studentid } = req.body

  try {
    // 🛑 Validate input
    if (!Array.isArray(documentList) || documentList.length === 0) {
      return res
        .status(400)
        .json({ message: 'Invalid or empty document list.' })
    }

    // 🔍 Step 1: Verify if the user exists
    const user = await User.findOne({ Email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // 🔍 Step 2: Find the student by ID
    const student = await Student.findById(studentid)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // // 🚧 Step 3: Check if student is signed up
    // if (student.studentTag !== 'SIGNED UP') {
    //   return res.status(400).json({ message: 'Student is not signed up' })
    // }

    // ✅ Step 4: Update the document checklist based on the array of objects
    const updatedDocs = []
    documentList.forEach((docObj) => {
      // Each object has one key-value pair: documentName: boolean
      const [documentName, status] = Object.entries(docObj)[0]

      // Check if the document exists in the checklist
      if (documentName in student.DocumentCheckList) {
        student.DocumentCheckList[documentName] = status
        updatedDocs.push(`${documentName}: ${status}`)
      }
    })

    // 🛑 Step 5: Check if any documents were updated
    if (updatedDocs.length === 0) {
      return res.status(400).json({
        message: 'No valid documents found to update.',
      })
    }

    // 💾 Step 6: Save the updated student record
    await student.save()

    // 🎉 Step 7: Send success response
    return res.status(200).json({
      message: `Documents updated successfully: ${updatedDocs.join(', ')}`,
      DocumentCheckList: student.DocumentCheckList,
    })
  } catch (error) {
    console.error('Error updating document checklist:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
