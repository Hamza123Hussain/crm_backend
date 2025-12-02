import mongoose from 'mongoose'
import { Mongo_url } from './Config.js'
import Notifications from './DB/Models/Notifications.js'
export const FixMissingUpdatedBy = async () => {
  try {
    const UpdatedByValue = 'gptprompts87@gmail.com'

    const filterCondition = {
      $or: [
        { UpdatedBy: { $exists: false } },
        { UpdatedBy: null },
        { UpdatedBy: '' },
      ],
    }

    const updateData = { UpdatedBy: UpdatedByValue }

    const visitResult = await Notifications.updateMany(
      filterCondition,
      updateData
    )

    console.log('✔ UpdatedBy field fixed successfully!')
    console.log({
      visitUpdated: visitResult.modifiedCount,
    })
  } catch (error) {
    console.error('❌ Error fixing UpdatedBy:', error)
  }
}

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
