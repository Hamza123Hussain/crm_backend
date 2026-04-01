import { Student } from '../../Models/Student.js'
import { performance } from 'perf_hooks'

export const GetAllStudents = async (req, res) => {
  const startTime = performance.now()

  try {
    const AllStudents = await Student.find().sort({ _id: -1 }).lean()

    if (AllStudents.length === 0) {
      return res.status(404).json({ message: 'No new students found' })
    }

    // --- DIAGNOSTIC SECTION ---
    const totalSize =
      Buffer.byteLength(JSON.stringify(AllStudents)) / 1024 / 1024 // Size in MB
    const avgSize = (
      Buffer.byteLength(JSON.stringify(AllStudents[0])) / 1024
    ).toFixed(2) // Size in KB

    console.log(`[Diagnostic] Total Payload: ${totalSize.toFixed(2)} MB`)
    console.log(`[Diagnostic] Avg Student Size: ${avgSize} KB`)
    // --------------------------

    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(2)

    console.log(`[Backend] Student fetch took: ${duration}ms`)
    res.setHeader('Server-Timing', `db;dur=${duration};desc="Database Fetch"`)

    return res.status(200).json(AllStudents)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error.' })
  }
}
