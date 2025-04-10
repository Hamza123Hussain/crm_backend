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
      { ProgressName: 'AwaitingDocs', Completion: false },
      { ProgressName: 'University Selection', Completion: false },
      { ProgressName: 'Applied To Uni', Completion: false },
      { ProgressName: 'Waiting For Offer', Completion: false },
      { ProgressName: 'Offer received', Completion: false },
      { ProgressName: 'Deposit Done', Completion: false },
      { ProgressName: 'Waiting For i20/ Cas', Completion: false },
      { ProgressName: 'I20/ CAS RECEIVED', Completion: false },
      { ProgressName: 'VISA BOOKING', Completion: false },
      { ProgressName: 'VISA STATUS', Completion: false },
      { ProgressName: 'FLIGHT BOOKING', Completion: false },
      { ProgressName: 'CASE CLOSED', Completion: false },
    ]

    const result = await Student.updateMany(
      {
        $or: [
          { ProgressStatus: { $exists: false } },
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
