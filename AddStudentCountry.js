import { Student } from './DB/Models/Student.js'
import { DB_CONNECTED } from './DB_Connect.js'

async function updateCountryForAllStudents() {
  try {
    DB_CONNECTED()

    const result = await Student.updateMany(
      {}, // empty filter = ALL documents
      { $set: { country: 'Pakistan' } }
    )

    console.log(`🎉 Updated ${result.modifiedCount} students`)
    mongoose.connection.close()
  } catch (err) {
    console.error('❌ Error:', err)
    mongoose.connection.close()
  }
}

updateCountryForAllStudents()
