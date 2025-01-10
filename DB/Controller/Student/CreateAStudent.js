import { Student } from '../../Models/Student.js'

export const createStudent = async (req, res) => {
  const {
    name,
    email,
    address,
    phone,
    city,
    preferredCountries, // updated to accept an array
    academicLevel1,
    level1Marks,
    level1Year,
    academicLevel2,
    level2Marks,
    level2Year,
    bachelorDegree,
    bachelorCGPA,
    bachelorYear,
    masterDegree,
    masterCGPA,
    masterYear,
    educationLevel,
    primaryCoursePreference,
    secondaryCoursePreference,
    languageTest,
    languageTestScore,
    budget,
    visaHistory,
    preferredCounselingMode,
    heardAboutUs,
  } = req.body

  try {
    // Check if the student already exists by email
    const existingStudent = await Student.findOne({ email })
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: 'Student with this email already exists' })
    }

    // Generate a unique 4-digit _id
    let uniqueId
    let isUnique = false

    while (!isUnique) {
      uniqueId = Math.floor(1000 + Math.random() * 9000) // Generate a 4-digit number
      const idExists = await Student.findOne({ _id: uniqueId })
      if (!idExists) isUnique = true
    }

    // Create new student
    const newStudent = new Student({
      _id: uniqueId, // Use the generated 4-digit number
      name,
      email,
      address,
      phone,
      city,
      preferredCountries, // directly use array of preferred countries
      academicLevel1,
      level1Marks,
      level1Year,
      academicLevel2,
      level2Marks,
      level2Year,
      bachelorDegree,
      bachelorCGPA,
      bachelorYear,
      masterDegree,
      masterCGPA,
      masterYear,
      educationLevel,
      primaryCoursePreference,
      secondaryCoursePreference,
      languageTest,
      languageTestScore,
      budget,
      visaHistory,
      preferredCounselingMode,
      heardAboutUs,
      studentTag: 'NEW',
    })

    // Save new student to MongoDB
    await newStudent.save()
    return res
      .status(201)
      .json({ message: 'Student created successfully', student: newStudent })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
