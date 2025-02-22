import { Student } from '../../../Models/Student.js'

export const GetSingleOptionDetail = async (req, res) => {
  try {
    const { studentId, optionIndex } = req.query // Extract studentId and optionIndex

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Ensure OptionDetails exists and index is valid
    if (
      !student.OptionDetails ||
      student.OptionDetails.options.length <= optionIndex
    ) {
      return res.status(404).json({ message: 'Option record not found' })
    }

    // Get the specific option record
    const option = student.OptionDetails.options[optionIndex]

    return res.status(200).json({
      message: 'Option record retrieved successfully',
      option,
    })
  } catch (error) {
    console.error('Error retrieving single option detail:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
