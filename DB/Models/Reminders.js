import mongoose from 'mongoose'
const VisitReminderSchema = new mongoose.Schema({
  UserID: { type: Number },
  UserName: { type: String },
  VisitDate: {
    type: Date,
  },
  VisitTime: {
    type: String,
  },
  VisitStatus: {
    type: String,
  },
  StudentTag: { type: String },
})
export const VisitReminderModel = mongoose.model(
  'VisitReminder',
  VisitReminderSchema
)
const MeetingReminderSchema = new mongoose.Schema({
  UserID: { type: Number },
  UserName: { type: String },
  MeetingDate: {
    type: Date,
  },
  MeetingTime: {
    type: String, // Format: "HH:mm"
  },
  MeetingStatus: {
    type: String,
    enum: ['Attended', 'Declined', 'Rescheduled', 'scheduled'],
  },
  MeetingReminder: {
    type: Boolean,
    default: false,
  },
  MeetingFeedBack: {
    type: String,
    default: '',
  },
  StudentTag: { type: String },
  UpdatedBy: { type: String, default: '' },
})
export const MeetingReminderModel = mongoose.model(
  'MeetingReminder',
  MeetingReminderSchema
)
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
export const ContactReminderModel = mongoose.model(
  'ContactReminder',
  ContactReminderSchema
)
