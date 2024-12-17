import dummyStudentModel from '../../Models/Dummy.js'

export const GetDummyStudents = async (req, res) => {
  try {
    // Fetch all students from the database
    const AllStudents = await dummyStudentModel.find()

    // Return the fetched students as a JSON response
    res.status(200).json(AllStudents)
  } catch (error) {
    // Handle any error that occurs during the database operation
    console.error('Error fetching students:', error)

    // Send error response with a relevant status code
    res.status(500).json({ message: 'Failed to fetch students.' })
  }
}
