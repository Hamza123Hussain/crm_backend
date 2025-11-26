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
    if (updateData.DocumentCheckList)
      updatedFields.DocumentCheckList = updateData.DocumentCheckList
    if (updateData.PaymentCheckList)
      updatedFields.PaymentCheckList = updateData.PaymentCheckList
    if (updateData.VisaDetails)
      updatedFields.VisaDetails = updateData.VisaDetails
    if (updateData.TravelDetails)
      updatedFields.TravelDetails = updateData.TravelDetails
    if (updateData.OptionDetails)
      updatedFields.OptionDetails = updateData.OptionDetails
    if (updateData.GoogleReview)
      updatedFields.GoogleReview = updateData.GoogleReview
    if (updateData.YearIntake) updatedFields.YearIntake = updateData.YearIntake
    if (updateData.attestedByHEC !== undefined)
      updatedFields.attestedByHEC = updateData.attestedByHEC
    if (updateData.attestedByForeignOffice !== undefined)
      updatedFields.attestedByForeignOffice = updateData.attestedByForeignOffice
    if (updateData.ConsentForm !== undefined) {
      updatedFields.ConsentForm = updateData.ConsentForm
    }
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
