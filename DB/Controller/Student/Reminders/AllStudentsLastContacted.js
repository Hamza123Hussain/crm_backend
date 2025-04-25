import { Student } from '../../../Models/Student.js'
/**
 * Get students whose last contact date was exactly 2 days ago.
 */
export async function getStudentsContactedTwoDaysAgo() {
  try {
    const today = new Date()
    const twoDaysAgo = new Date(today)
    twoDaysAgo.setDate(today.getDate() - 2)
    const startOfDay = new Date(twoDaysAgo.setHours(0, 0, 0, 0))
    const endOfDay = new Date(twoDaysAgo.setHours(23, 59, 59, 999))
    // Query using $expr and $arrayElemAt
    const students = await Student.find({
      $expr: {
        $and: [
          { $gt: [{ $size: '$ContactDetails' }, 0] },
          {
            $and: [
              {
                $gte: [
                  { $arrayElemAt: ['$ContactDetails.ContactedDate', -1] },
                  startOfDay,
                ],
              },
              {
                $lte: [
                  { $arrayElemAt: ['$ContactDetails.ContactedDate', -1] },
                  endOfDay,
                ],
              },
            ],
          },
        ],
      },
    })
    console.log(`📦 Found ${students.length} students contacted 2 days ago`)
    return students
  } catch (error) {
    console.error('❌ Error while fetching students:', error.message)
    return []
  } finally {
    // Optional: close connection if you don't need to reuse
    // await mongoose.connection.close();
  }
}
