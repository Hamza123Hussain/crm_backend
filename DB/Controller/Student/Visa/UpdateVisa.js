import { Student } from '../../../Models/Student.js'

export const UpdateVisaDetails = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from request
    const {
      VisaApproved,
      VisaAppointmentDate,
      InterviewPracticeDone,
      DS160_UK_VISA_FORM_FILLED,
    } = req.body

    // Find student
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Ensure VisaDetails exists
    if (!student.VisaDetails) {
      student.VisaDetails = {}
    }

    // Update fields only if provided
    if (VisaApproved !== undefined)
      student.VisaDetails.VisaApproved = VisaApproved
    if (VisaAppointmentDate !== undefined)
      student.VisaDetails.VisaAppointmentDate = VisaAppointmentDate
    if (InterviewPracticeDone !== undefined)
      student.VisaDetails.InterviewPracticeDone = InterviewPracticeDone
    if (DS160_UK_VISA_FORM_FILLED !== undefined)
      student.VisaDetails['DS160/UK VISA FORM FILLED'] =
        DS160_UK_VISA_FORM_FILLED

    student.updatedAt = Date.now()
    await student.save()

    return res.status(200).json({
      message: 'Visa details updated successfully',
      VisaDetails: student.VisaDetails,
    })
  } catch (error) {
    console.error('Error updating visa details:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
