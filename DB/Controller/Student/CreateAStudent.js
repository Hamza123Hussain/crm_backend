import { google } from 'googleapis'
import { Student } from '../../Models/Student.js'
import dotenv from 'dotenv'

dotenv.config()

// Set up Google Sheets authentication using embedded credentials
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.client_email,
    private_key: process.env.private_key.replace(/\\n/g, '\n'), // Handle escaped newlines
    project_id: process.env.project_id,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Required scope for Sheets API
})
const sheets = google.sheets({ version: 'v4', auth })

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
    const lastStudent = await Student.findOne().sort({ _id: -1 }).limit(1) // Get the latest student by _id
    let uniqueId = 1433 // Default to 1432 for the first student
    if (lastStudent) {
      uniqueId = lastStudent._id + 1 // Increment the last student's ID
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

    // Get current date for 'createdAt' timestamp
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ')

    // Prepare data for Google Sheets
    const spreadsheetId = '1cdH7xB54g5LJyxbHZ0c46t8y2p7D4SYPfkyIqF3pqRA' // Your Google Sheet ID
    const range = 'Consultation Form!A1' // The correct range to start appending data
    const studentData = [
      uniqueId,
      createdAt, // Adding the 'createdAt' timestamp
      name,
      country,
      email,
      phone,
      city,
      preferredCountries.join(', '), // Convert array to string
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

    // Append data to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED', // Format as entered
      insertDataOption: 'INSERT_ROWS', // Insert new rows
      resource: {
        values: [studentData], // Data to append
      },
    })

    return res
      .status(201)
      .json({ message: 'Student created successfully', student: newStudent })
  } catch (error) {
    console.error('Error in createStudent:', error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
