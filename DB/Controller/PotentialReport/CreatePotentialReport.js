import { PotentialReport } from '../../Models/PotentialReportModel.js'
import { Student } from '../../Models/Student.js'

export const CreatePotentialReport = async (req, res) => {
  try {
    const { name, email, phone, country, LastNote, ContactedDate, id } =
      req.body

    // 1. Safety Check: Ensure the student exists in the main database
    const student = await Student.findById(id)
    if (!student) {
      return res
        .status(404)
        .json({ message: 'Original student record not found' })
    }

    // 2. Duplicate Check & Toggle Off: Check if report exists by email
    const existingReport = await PotentialReport.findOne({ email: email })

    if (existingReport) {
      // If it exists, we DELETE it and set status to false
      await PotentialReport.findByIdAndDelete(existingReport._id)

      student.markaspotential = false
      await student.save()

      return res.status(200).json({
        message: 'Report removed and student status updated to false',
        markaspotential: false,
      })
    }

    // 3. Create Mode: If no report exists, create one and set status to true
    student.markaspotential = true
    await student.save()

    const newReport = new PotentialReport({
      name,
      email,
      phone,
      country,
      LastNote,
      ContactedDate,
    })

    await newReport.save()

    return res.status(201).json({
      message: 'Student promoted to Potential Report successfully',
      student: newReport,
      markaspotential: true,
    })
  } catch (error) {
    console.error('CreatePotentialReport Error:', error)
    return res
      .status(500)
      .json({ message: 'Server error, please try again later' })
  }
}
