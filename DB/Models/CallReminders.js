import mongoose from 'mongoose'
const ContactReminderSchema = new mongoose.Schema({
  UserID: { type: Number },
  UserName: { type: String },
  ContactedDate: {
    type: Date,
  },
  ContactedTime: {
    type: String,
  },
  ContactReminder: {
    type: Date,
  },
  FollowUpMessage: {
    type: Boolean,
  },
  ResponseStatus: {
    type: String,
    enum: ['No Response', 'Unable To Connect', 'Contacted', 'Text Dropped'],
  },
  DiscussedWithFamily: {
    type: Boolean,
  },
  PhoneNumber: {
    type: Number,
  },
  LocationShared: {
    type: Boolean,
  },
  StudentTag: {
    type: String,
  },
  UpdatedBy: { type: String, default: '' },
})
export const CallReminders = mongoose.model(
  'CallReminder',
  ContactReminderSchema
)
