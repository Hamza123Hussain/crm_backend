import mongoose from 'mongoose'
import { Student } from './DB/Models/Student.js'

// Make sure this is your correct MongoDB URI
const MONGODB_URI =
  'mongodb+srv://octtoppus1:OCTTOPPUS1@gg1208crm.dy2kw.mongodb.net/?retryWrites=true&w=majority&appName=GG1208CRM'

async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}

async function addProgressStatusToAllStudents() {
  try {
    const defaultProgressStatus = [
      { ProgressName: 'Awaiting Documents', Completion: false },
      { ProgressName: 'University Selection', Completion: false },
      { ProgressName: 'Signed Up', Completion: false },
      { ProgressName: 'Applied to Universities', Completion: false },
      { ProgressName: 'Waiting for University Offers', Completion: false },
      { ProgressName: 'Offers Received', Completion: false },
      { ProgressName: 'Deposit Done', Completion: false },
      { ProgressName: 'Waiting for I-20 / CAS', Completion: false },
      { ProgressName: 'I-20 / CAS Received', Completion: false },
      { ProgressName: 'Visa Process', Completion: false },
      { ProgressName: 'Flight Booking', Completion: false },
      { ProgressName: 'Case Closed', Completion: false },
    ]

    const result = await Student.updateMany(
      {
        $or: [
          { ProgressStatus: { $exists: true } },
          { ProgressStatus: { $size: 0 } },
        ],
      },
      { $set: { ProgressStatus: defaultProgressStatus } }
    )

    console.log(
      `✅ ${result.modifiedCount} students updated with ProgressStatus.`
    )
  } catch (error) {
    console.error('❌ Error updating ProgressStatus for students:', error)
  } finally {
    mongoose.disconnect()
  }
}

async function run() {
  await connectToDB()
  await addProgressStatusToAllStudents()
}

run()
