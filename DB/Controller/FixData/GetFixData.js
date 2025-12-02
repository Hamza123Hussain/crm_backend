import { FixData } from '../../Models/FixDataModel.js'

export const GetFixStudents = async (req, res) => {
  try {
    const { studentId } = req.query

    // ✅ If studentId is provided, get single student
    if (studentId) {
      const student = await FixData.findOne({ studentId: Number(studentId) })
      if (!student)
        return res.status(404).json({ message: 'Student not found' })

      return res.status(200).json({ student })
    }

    // ✅ Otherwise get all students
    const students = await FixData.find().sort({ createdAt: -1 })
    return res.status(200).json({ count: students.length, students })
  } catch (error) {
    console.error('GetStudents Error:', error)
    return res
      .status(500)
      .json({ message: 'Server error, please try again later' })
  }
}
