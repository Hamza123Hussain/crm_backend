import { Student } from '../../Models/Student.js'
// Function to fetch and format all student data in JSON format
export const fetchAllStudentData = async () => {
  try {
    const students = await Student.find() // Fetch all data
    // Format data into a structured JSON array
    const formattedData = students.map((student) => ({
      Name: student.name,
      Email: student.email,
      Status: student.status, // Assuming this is an array
      Notes: student.notes || 'None',
      PreferredCountries: student.preferredCountries || [],
      EducationLevel: student.educationLevel || 'Not Specified',
      Budget: student.budget || 'Not Provided',
      StudentTag: student.studentTag,
      attestedByForeignOffice: student.attestedByForeignOffice,
      attestedByHEC: student.attestedByHEC,
      VistDate: student.VistDate,
    }))
    return formattedData
  } catch (error) {
    console.error('Error fetching student data:', error)
    throw new Error('Failed to fetch student data')
  }
}
