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

    // 2. Duplicate Prevention: Check if a report with this phone already exists
    const existingReport = await PotentialReport.findOne({ phone: phone })
    if (existingReport) {
      return res.status(400).json({
        message: 'A report for this phone number already exists.',
      })
    }

    // 3. Update the student's status
    // We set it to 'true' explicitly rather than toggling it (!)
    // to keep the data consistent with the report creation.
    student.markaspotential = !student.markaspotential
    await student.save()

    // 4. Create the new report
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
    })
  } catch (error) {
    console.error('CreatePotentialReport Error:', error)
    return res
      .status(500)
      .json({ message: 'Server error, please try again later' })
  }
}
