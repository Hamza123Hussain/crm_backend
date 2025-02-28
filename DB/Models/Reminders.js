import mongoose from 'mongoose'

const ReminderSchema = new mongoose.Schema({
  VisitReminder: [
    {
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
    },
  ],

  ContactReminder: [
    {
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
        enum: ['No Response', 'Unable To Connect', 'Contacted'],
      },
      DiscussedWithFamily: {
        type: Boolean,
      },
      LocationShared: {
        type: Boolean,
      },
    },
  ],
  MeetingReminder: [
    {
      UserID: { type: Number },
      UserName: { type: String },
      MeetingDate: {
        type: Date,
        required: true,
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
    },
  ],
})
export const ReminderModel = mongoose.model('Reminder', ReminderSchema)
