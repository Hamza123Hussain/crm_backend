import { Student } from '../../../Models/Student.js'

export const UpdateOptionDetails = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId
    const newOptionDetails = req.body // Extract new option details

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Replace entire OptionDetails with new data
    student.OptionDetails = {
      options: newOptionDetails.options, // Replace entire options array
      optionspresented: newOptionDetails.optionspresented || false,
      optionspresentedDate: newOptionDetails.optionspresentedDate || '',
      MOIOptions: newOptionDetails.MOIOptions || false,
      FeedBack: newOptionDetails.FeedBack || '',
      WithinBudget: newOptionDetails.WithinBudget || false,
      OptionsFinalized: newOptionDetails.OptionsFinalized || false,
    }

    student.markModified('OptionDetails') // Mark as modified
    await student.save()

    return res.status(200).json({
      message: 'Option details replaced successfully',
      OptionDetails: student.OptionDetails,
    })
  } catch (error) {
    console.error('Error updating option details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
