import { Student } from '../../Models/Student.js'
import { User } from '../../Models/User.js'
export const UpdatePaymentList = async (req, res) => {
  const {
    FirstInstallmentPaid, // Specific payment-related document to update (e.g., 'InitialPayment', 'FullPayment')
    RemainingPaymentPaid,
    userid, // ID of the user performing the update
    studentid, // ID of the student whose payment checklist will be updated
    PackagePrice, // Total price of the selected package
    PackageSelected, // Name or details of the selected package
    PaymentDone, // Amount of payment done by the student
    Discount, // Discount as a percentage (e.g., 10 for 10%)
  } = req.body
  try {
    // Step 1: Verify if the user exists in the database
    const userExists = await User.findById(userid)
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' })
    }
    // Step 2: Find the student by their ID
    const existingStudent = await Student.findById(studentid)
    if (!existingStudent) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // // Step 3: Ensure the student is signed up before updating payment details
    // if (existingStudent.studentTag !== 'SIGNED UP') {
    //   return res.status(400).json({ message: 'Student is not signed up' })
    // }
    // Step 4: Validate the existence of the PaymentCheckList object
    if (!existingStudent.PaymentCheckList) {
      existingStudent.PaymentCheckList = {} // Initialize if it doesn't exist
    }
    // Step 5: Update the payment-related document (e.g., marking a payment as done)
    if (FirstInstallmentPaid) {
      existingStudent.PaymentCheckList.FirstInstallmentPaid = true // Mark the specific document as true
    }
    if (RemainingPaymentPaid) {
      existingStudent.PaymentCheckList.RemainingPaymentPaid = true // Mark the specific document as true
    }
    // Step 6: Update additional payment details if provided
    if (Discount !== undefined) {
      existingStudent.PaymentCheckList.Discount = Discount
    }
    if (PackageSelected) {
      existingStudent.PaymentCheckList.PackageSelected = PackageSelected
    }
    if (PackagePrice !== undefined) {
      existingStudent.PaymentCheckList.PackagePrice = PackagePrice
    }
    if (PaymentDone !== undefined) {
      existingStudent.PaymentCheckList.PaymentDone = PaymentDone
      // Step 7: Calculate the remaining payment considering the discount
      const packagePrice = existingStudent.PaymentCheckList.PackagePrice || 0
      const discountPercentage = existingStudent.PaymentCheckList.Discount || 0
      // Apply discount as a percentage
      const discountedAmount = (packagePrice * discountPercentage) / 100
      const finalPriceAfterDiscount = packagePrice - discountedAmount
      // Calculate the remaining payment
      existingStudent.PaymentCheckList.PaymentRemaining =
        finalPriceAfterDiscount - PaymentDone
    }
    // Step 8: Save the updated student record to the database
    await existingStudent.save()
    // Step 9: Send a success response with updated payment details
    return res.status(200).json({
      message: `Payment details for '${existingStudent.name}' have been updated successfully.`,
      PaymentCheckList: existingStudent.PaymentCheckList,
    })
  } catch (error) {
    console.error('Error updating payment checklist:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
