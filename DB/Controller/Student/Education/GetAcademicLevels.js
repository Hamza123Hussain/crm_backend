import { Student } from '../../../Models/Student.js'

export const GetAcademicLevels = async (req, res) => {
  const { studentid } = req.query // Use req.params for ID
  try {
    // Fetch a A student by ID with only required fields
    const AcademicLevels = await Student.findById(studentid).select(
      'academicLevel1 level1Marks level1Year academicLevel2 level2Marks level2Year'
    )
    // If student not found
    if (!AcademicLevels) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Return the found student
    return res.status(200).json(AcademicLevels)
  } catch (error) {
    console.error('Error fetching student:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
