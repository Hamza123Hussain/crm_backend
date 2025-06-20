import { Student } from '../../Models/Student.js'

// 📘 Controller: Get all students with either no ContactDetails OR empty notes
export const GetNoCallsstudents = async (req, res) => {
  try {
    // 🔍 Find students where:
    // EITHER ContactDetails is missing or has 0 items
    // OR notes is missing or is an empty string
    const AllStudents = await Student.find({
      $or: [
        // 🧩 Condition 1: ContactDetails is missing or empty
        { ContactDetails: { $exists: false } },
        { ContactDetails: { $size: 0 } },

        // 🧩 Condition 2: Notes is missing or an empty string
        { notes: '' },
        { notes: { $exists: false } },
      ],
    }).sort({ _id: -1 }) // 🔽 Sort by _id descending (newest first)

    // 📭 No students found
    if (AllStudents.length === 0) {
      return res
        .status(404)
        .json({
          message: 'No students found with missing contact details or notes.',
        })
    }

    // ✅ Send matching students along with the count
    return res.status(200).json({
      Students: AllStudents,
      Length: AllStudents.length,
    })
  } catch (error) {
    // ⚠️ Error handling
    console.error('Error fetching students:', error)
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    })
  }
}
