import { Student } from '../../Models/Student.js'

export const GetAlevelStudents = async (req, res) => {
  try {
    // Fetch all students and sort by _id in descending order
    const AllStudents = await Student.find({ academicLevel2: 'A Level' }).sort({
      _id: -1,
    })

    if (AllStudents.length === 0) {
      return res.status(404).json({ message: 'No new students found' })
    }

    return res.status(200).json(AllStudents)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
