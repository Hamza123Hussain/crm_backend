import { Student } from '../../Models/Student.js'
import { performance } from 'perf_hooks'

export const GetPotentialStudents = async (req, res) => {
  const startTime = performance.now()

  try {
    // .select() tells MongoDB to only return these specific fields
    const PotentialStudents = await Student.find({ markaspotential: true })
      .select('_id name email phone country ContactDetails')
      .sort({ _id: -1 })
      .lean()

    if (PotentialStudents.length === 0) {
      return res.status(404).json({ message: 'No new students found' })
    }

    // --- DIAGNOSTIC SECTION ---
    const totalSize =
      Buffer.byteLength(JSON.stringify(PotentialStudents)) / 1024 / 1024
    const avgSize = (
      Buffer.byteLength(JSON.stringify(PotentialStudents[0])) / 1024
    ).toFixed(2)
    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(2)
    res.setHeader('Server-Timing', `db;dur=${duration};desc="Database Fetch"`)
    return res.status(200).json(PotentialStudents)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error.' })
  }
}
