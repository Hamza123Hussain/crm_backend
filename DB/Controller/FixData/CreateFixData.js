import { FixData } from '../../Models/FixDataModel.js'
import { Student } from '../../Models/Student.js'

export const CreateFixData = async (req, res) => {
  try {
    const { studentId, name, email, phone, country } = req.body

    // ✅ Create new student
    const newStudent = new FixData({
      studentId,
      name,
      email,
      phone,
      country,
    })

    await newStudent.save()

    return res.status(201).json({
      message: 'Student created successfully',
      student: newStudent,
    })
  } catch (error) {
    console.error('CreateStudent Error:', error)
    return res
      .status(500)
      .json({ message: 'Server error, please try again later' })
  }
}
