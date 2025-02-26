import { Student } from '../../../Models/Student.js'

// 🟣 Get all Visits for a student
export const GetAllVisits = async (req, res) => {
  try {
    const { studentId } = req.query

    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    return res.status(200).json(student.VisitDetails)
  } catch (error) {
    console.error('Error getting all Visits:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
