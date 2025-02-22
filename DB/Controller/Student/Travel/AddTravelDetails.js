import { Student } from '../../../Models/Student.js'

export const AddandUpdateTravelDetails = async (req, res) => {
  try {
    const { studentId } = req.query
    const { TicketBooked, TravelDate, TicketPaymentDone } = req.body

    // Find student
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Ensure TravelDetails exists
    if (!student.TravelDetails) {
      student.TravelDetails = {}
    }

    // Update fields only if provided
    if (TicketBooked !== undefined)
      student.TravelDetails.TicketBooked = TicketBooked
    if (TravelDate !== undefined) student.TravelDetails.TravelDate = TravelDate
    if (TicketPaymentDone !== undefined)
      student.TravelDetails.TicketPaymentDone = TicketPaymentDone

    student.updatedAt = Date.now()
    await student.save()

    return res.status(200).json({
      message: 'Travel details updated successfully',
      TravelDetails: student.TravelDetails,
    })
  } catch (error) {
    console.error('Error updating travel details:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
