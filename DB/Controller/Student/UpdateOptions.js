import { Student } from '../../Models/Student.js'
export const UpdateOptions = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from URL
    const {
      options,
      optionspresented,
      MOIOptions,
      FeedBack,
      WithinBudget,
      updatedBy,
      optionspresentedDate,
    } = req.body // Extract update data from request body
    // Check if the student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // Ensure OptionDetails is initialized
    if (!student.OptionDetails) {
      student.OptionDetails = {
        options: [],
        optionspresented: false,
        MOIOptions: false,
        FeedBack: '',
        WithinBudget: false,
        optionspresentedDate: null,
      }
    }
    // Update fields only if provided
    if (options !== undefined) student.OptionDetails.options = options
    if (optionspresented !== undefined) {
      student.OptionDetails.optionspresented = optionspresented
      // If options are presented, update date
      if (optionspresented && !optionspresentedDate) {
        student.OptionDetails.optionspresentedDate = Date.now()
      }
    }
    if (MOIOptions !== undefined) student.OptionDetails.MOIOptions = MOIOptions
    if (FeedBack !== undefined) student.OptionDetails.FeedBack = FeedBack
    if (optionspresentedDate !== undefined) {
      student.OptionDetails.optionspresentedDate = optionspresentedDate
    }
    if (WithinBudget !== undefined)
      student.OptionDetails.WithinBudget = WithinBudget
    // Mark nested object as modified
    student.markModified('OptionDetails')
    // Always update the updatedAt timestamp and updatedBy field
    student.updatedAt = Date.now()
    if (updatedBy) student.updatedBy = updatedBy
    // Save updated student document
    await student.save()
    return res.status(200).json({
      message: 'Student details updated successfully',
      updatedStudent: student,
    })
  } catch (error) {
    console.error('Error updating student details:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
