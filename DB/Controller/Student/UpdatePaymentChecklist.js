import { Student } from '../../Models/Student.js'
import { User } from '../../Models/User.js'

export const UpdatePaymentList = async (req, res) => {
  const { PaymentDetails } = req.body

  try {
    // Validate user
    const user = await User.findOne({ Email: PaymentDetails.Email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Validate student
    const student = await Student.findById(PaymentDetails.studentid)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Initialize PaymentCheckList if missing
    if (!student.PaymentCheckList) {
      student.PaymentCheckList = {}
    }

    // Update boolean fields
    student.PaymentCheckList.FirstInstallmentPaid =
      !!PaymentDetails.FirstInstallmentPaid
    student.PaymentCheckList.RemainingPaymentPaid =
      !!PaymentDetails.RemainingPaymentPaid

    // Update text/number fields
    student.PaymentCheckList.PackageSelected = PaymentDetails.PackageSelected
    student.PaymentCheckList.PackagePrice = PaymentDetails.PackagePrice
    student.PaymentCheckList.PaymentDone = PaymentDetails.PaymentDone
    student.PaymentCheckList.PaymentRemaining = PaymentDetails.PaymentRemaining
    student.PaymentCheckList.Discount = PaymentDetails.Discount

    // Calculate the remaining payment if payment done is updated
    if (PaymentDetails.PaymentDone !== undefined) {
      const { PackagePrice, Discount, PaymentDone } = PaymentDetails
      const discountedPrice = PackagePrice - (PackagePrice * Discount) / 100
      student.PaymentCheckList.PaymentRemaining = discountedPrice - PaymentDone
    }

    // Save updated student data
    await student.save()

    res.status(200).json({
      message: `Payment details for '${student.name}' have been updated successfully.`,
      PaymentCheckList: student.PaymentCheckList,
    })
  } catch (error) {
    console.error('Error updating payment checklist:', error)
    res
      .status(500)
      .json({ message: 'Server error. Please try again later.', error })
  }
}
