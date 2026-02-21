import { Student } from '../../Models/Student.js'
import { performance } from 'perf_hooks' // Built-in Node module

export const GetAllStudents = async (req, res) => {
  // 1. Start the timer
  const startTime = performance.now()

  try {
    // Fetch all students and sort by _id in descending order
    // .lean() is already included as we discussed for speed
    const AllStudents = await Student.find().sort({ _id: -1 }).lean()

    // 2. Calculate the duration
    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(2) // e.g., "1402.17"

    // 3. Log to your terminal
    console.log(`[Backend] Student fetch took: ${duration}ms`)

    // 4. Send the timing to the browser/Postman headers
    res.setHeader('Server-Timing', `db;dur=${duration};desc="Database Fetch"`)

    if (AllStudents.length === 0) {
      return res.status(404).json({ message: 'No new students found' })
    }

    return res.status(200).json(AllStudents)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' })
  }
}
