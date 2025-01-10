import { google } from 'googleapis'
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

// Define the Google Sheets ID and range
const spreadsheetId = '1466ALrWdBJ9A0a7VPWe0Nfr5FVx-g4lkHVoqYZr1n7A' // Replace with your Google Sheet ID
const range = 'Sheet1!A1' // Starting cell for the data (adjust if needed)

// Header row for the Google Sheet
const headers = [
  'ID',
  'Name',
  'Email',
  'Address',
  'Phone',
  'City',
  'Preferred Countries',
  'Academic Level 1',
  'Level 1 Marks',
  'Level 1 Year',
  'Academic Level 2',
  'Level 2 Marks',
  'Level 2 Year',
  'Bachelor Degree',
  'Bachelor CGPA',
  'Bachelor Year',
  'Master Degree',
  'Master CGPA',
  'Master Year',
  'Education Level',
  'Primary Course Preference',
  'Secondary Course Preference',
  'Language Test',
  'Language Test Score',
  'Budget',
  'Visa History',
  'Preferred Counseling Mode',
  'Heard About Us',
]

// Function to add headers if not already present
const addHeadersIfNeeded = async () => {
  try {
    // Get the current sheet data to check if headers exist
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:Z1', // Check the first row for headers
    })

    const currentHeaders = res.data.values && res.data.values[0]

    if (!currentHeaders || currentHeaders.length !== headers.length) {
      // Set headers only if they don't exist or are incorrect
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1', // Place the headers at the top row
        valueInputOption: 'RAW',
        resource: {
          values: [headers], // Add headers row
        },
      })
      console.log('Headers added successfully!')
    } else {
      console.log('Headers already exist!')
    }
  } catch (error) {
    console.error('Error adding headers:', error)
  }
}

// Call this function to ensure headers are added once
addHeadersIfNeeded()
