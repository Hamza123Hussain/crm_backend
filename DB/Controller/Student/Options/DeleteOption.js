import { Student } from '../../../Models/Student.js'

export const DeleteOptionDetails = async (req, res) => {
  try {
    const { studentId, optionIndex } = req.query // Extract studentId and optionIndex

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

    // Remove the option record
    student.OptionDetails.options.splice(optionIndex, 1)
    student.markModified('OptionDetails') // Mark as modified
    await student.save()

    return res
      .status(200)
      .json({ message: 'Option record deleted successfully' })
  } catch (error) {
    console.error('Error deleting option details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
