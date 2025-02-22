import { Student } from '../../../Models/Student.js'

export const UpdateOptionDetails = async (req, res) => {
  try {
    const { studentId, optionIndex } = req.query // Extract studentId and optionIndex
    const {
      optionName,
      I20_CAS_Recieved,
      optionspresented,
      optionspresentedDate,
      MOIOptions,
      FeedBack,
      WithinBudget,
      OptionsFinalized,
    } = req.body

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Ensure OptionDetails exists
    if (
      !student.OptionDetails ||
      student.OptionDetails.options.length <= optionIndex
    ) {
      return res.status(404).json({ message: 'Option record not found' })
    }

    // Get the option record to update
    const option = student.OptionDetails.options[optionIndex]

    // Update only the provided fields
    if (optionName !== undefined) option.optionName = optionName
    if (I20_CAS_Recieved !== undefined)
      option['I20/CAS Recieved'] = I20_CAS_Recieved

    // Update main OptionDetails object fields if provided
    if (optionspresented !== undefined)
      student.OptionDetails.optionspresented = optionspresented
    if (optionspresentedDate !== undefined)
      student.OptionDetails.optionspresentedDate = optionspresentedDate
    if (MOIOptions !== undefined) student.OptionDetails.MOIOptions = MOIOptions
    if (FeedBack !== undefined) student.OptionDetails.FeedBack = FeedBack
    if (WithinBudget !== undefined)
      student.OptionDetails.WithinBudget = WithinBudget
    if (OptionsFinalized !== undefined)
      student.OptionDetails.OptionsFinalized = OptionsFinalized

    student.markModified('OptionDetails') // Mark as modified
    await student.save()

    return res.status(200).json({
      message: 'Option record updated successfully',
      OptionDetails: student.OptionDetails,
    })
  } catch (error) {
    console.error('Error updating option details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
