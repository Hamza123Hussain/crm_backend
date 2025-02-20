import { Student } from '../../Models/Student.js'

export const UpdateStudentDetails = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from URL
    const updateData = req.body // Extract update data from request body
    // Check if the student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // Prepare update object (only update provided fields)
    const updatedFields = {}
    if (updateData.studentTag) updatedFields.studentTag = updateData.studentTag
    if (updateData.VisitDate)
      updatedFields.VisitDate = new Date(updateData.VisitDate)
    if (updateData.VisitDate) updatedFields.VisitDate = updateData.VisitDate
    if (updateData.notes) updatedFields.notes = updateData.notes
    if (updateData.YearIntake) updatedFields.YearIntake = updateData.YearIntake
    if (updateData.Refferal) updatedFields.Refferal = updateData.Refferal
    if (updateData.StudentVisited !== undefined)
      updatedFields.StudentVisited = updateData.StudentVisited
    if (updateData.LastContacted)
      updatedFields.LastContacted = new Date(updateData.LastContacted)
    if (updateData.attestedByHEC !== undefined)
      updatedFields.attestedByHEC = updateData.attestedByHEC
    if (updateData.attestedByForeignOffice !== undefined)
      updatedFields.attestedByForeignOffice = updateData.attestedByForeignOffice
    // Always update the updatedAt timestamp and updatedBy field
    updatedFields.updatedAt = Date.now()
    if (updateData.updatedBy) updatedFields.updatedBy = updateData.updatedBy
    // Update the student document
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $set: updatedFields },
      { new: true } // Return the updated document
    )
    // Return success response
    return res.status(200).json({
      message: 'Student details updated successfully',
      updatedStudent,
    })
  } catch (error) {
    console.error('Error updating student details:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
