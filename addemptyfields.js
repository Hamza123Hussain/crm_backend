import { Student } from './DB/Models/Student.js'

const BATCH_SIZE = 50 // Adjust this as needed
const documents = await Student.find({}, { _id: 1 }).limit(BATCH_SIZE)

for (const doc of documents) {
  await Student.updateOne(
    { _id: doc._id },
    {
      $set: {
        VisitDetails: [],
        ContactDetails: [],
        MeetingDetails: [],
        OptionDetails: {
          options: '',
          optionspresented: false,
          optionspresentedDate: null,
          MOIOptions: false,
          FeedBack: '',
          WithinBudget: false,
          OptionsFinalized: false,
        },
      },
    }
  )
}
