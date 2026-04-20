import { Student } from '../../Models/Student.js'

export const GetLevelStudents = async (req, res) => {
  try {
    // Find students where EITHER condition is met
    const students = await Student.find({
      $or: [
        { academicLevel2: 'Alevels' },
        { academicLevel1: 'O-Levels' }
      ]
    }).sort({ _id: -1 });

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found matching these levels' });
    }

    return res.status(200).json(students);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}