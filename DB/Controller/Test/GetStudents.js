import dummyStudentModel from '../../Models/Dummy.js'

export const GetDummyStudents = async (req, res) => {
  const page = parseInt(req.query.page) || 1 // Default to page 1
  const limit = parseInt(req.query.limit) || 20 // Default to 50 records per page
  const skip = (page - 1) * limit
  try {
    // Fetch all students from the database
    const AllStudents = await dummyStudentModel.find().skip(skip).limit(limit)
    const totalDocuments = await dummyStudentModel.countDocuments()
    // Return the fetched students as a JSON response
    res.status(200).json({
      Students: AllStudents,
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
    })
  } catch (error) {
    // Handle any error that occurs during the database operation
    console.error('Error fetching students:', error)
    // Send error response with a relevant status code
    res.status(500).json({ message: 'Failed to fetch students.' })
  }
}
