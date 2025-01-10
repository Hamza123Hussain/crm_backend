import { google } from 'googleapis'
import { Student } from '../../Models/Student.js'

// Authenticate using the service account
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // Path to your credentials JSON file
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

export const createStudent = async (req, res) => {
  const {
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
      uniqueId = Math.floor(1000 + Math.random() * 9000)
      const idExists = await Student.findOne({ _id: uniqueId })
      if (!idExists) isUnique = true
    }

    // Create new student
    const newStudent = new Student({
      _id: uniqueId,
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
    })

    // Save new student to MongoDB
    await newStudent.save()

    // Append data to Google Sheet
    const spreadsheetId = '1466ALrWdBJ9A0a7VPWe0Nfr5FVx-g4lkHVoqYZr1n7A' // Replace with your Google Sheet ID
    const range = 'Sheet1!A1' // Start at the very first cell

    const studentData = [
      uniqueId,
      name,
      email,
      address,
      phone,
      city,
      preferredCountries.join(', '), // Join array to store as a single cell
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
    ]

    // Append the data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED', // Data will be formatted as entered by the user
      insertDataOption: 'INSERT_ROWS', // Insert new rows, preserving existing data
      resource: {
        values: [studentData], // Append the student data
      },
    })

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
