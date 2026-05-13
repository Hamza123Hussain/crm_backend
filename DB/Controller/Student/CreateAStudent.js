import { Student } from '../../Models/Student.js'
 
export const createStudent = async (req, res) => {
  const {
    name,
    email,
    address,
    country,
    phone,
    city,
    preferredCountries,
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
    Refferal,
  } = req.body
 
  try {
    // Check if the student already exists by email
    const existingStudent = await Student.findOne({ email })
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: 'Student with this email already exists' })
    }
 
    // Get the highest current _id and increment it
    const lastStudent = await Student.findOne().sort({ _id: -1 }).limit(1)
    let uniqueId = 1433
    if (lastStudent) {
      uniqueId = lastStudent._id + 1
    }
 
    // Create a new student instance
    const newStudent = new Student({
      _id: uniqueId,
      country,
      name,
      email,
      address,
      phone,
      city,
      preferredCountries,
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
      Refferal,
    })
 
    // Save the new student to MongoDB
    await newStudent.save()
 
    return res
      .status(201)
      .json({ message: 'Student created successfully', student: newStudent })
  } catch (error) {
    console.error('Error in createStudent:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }}