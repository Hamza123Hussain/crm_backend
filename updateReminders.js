import { Mongo_url } from './Config.js'
import {
  ContactReminderModel,
  MeetingReminderModel,
  VisitReminderModel,
} from './DB/Models/Reminders.js'

const FixMissingUpdatedBy = async () => {
  try {
    const updatedByValue = 'gptprompts87@gmail.com'

    const filterCondition = {
      $or: [
        { UpdatedBy: { $exists: false } },
        { UpdatedBy: null },
        { UpdatedBy: '' },
      ],
    }

    const updateData = { UpdatedBy: updatedByValue }

    const visitResult = await VisitReminderModel.updateMany(
      filterCondition,
      updateData
    )
    const meetingResult = await MeetingReminderModel.updateMany(
      filterCondition,
      updateData
    )
    const contactResult = await ContactReminderModel.updateMany(
      filterCondition,
      updateData
    )

    console.log('✔ UpdatedBy field fixed successfully!')
    console.log({
      visitUpdated: visitResult.modifiedCount,
      meetingUpdated: meetingResult.modifiedCount,
      contactUpdated: contactResult.modifiedCount,
    })
  } catch (error) {
    console.error('❌ Error fixing UpdatedBy:', error)
  }
}
import mongoose from 'mongoose'

const start = async () => {
  try {
    await mongoose.connect(Mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('MongoDB Connected!')

    await FixMissingUpdatedBy()

    process.exit(0)
  } catch (err) {
    console.error('DB Error:', err)
    process.exit(1)
  }
}

start()
