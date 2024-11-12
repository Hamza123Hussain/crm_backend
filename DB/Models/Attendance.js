import mongoose from 'mongoose'

const AttendanceSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  UserData: {
    type: String,
  },
  entry: {
    type: Date,
    required: true,
  },
  exit: {
    type: Date,
  },
  currentDate: {
    type: Date,
    default: Date.now,
  },
  isAbsent: {
    type: Boolean,
    default: false,
  },
  User_ID: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  CheckInStatus: {
    type: Boolean,
    default: false,
  },
  onBreak: {
    type: Boolean,
    default: false,
  },
  Hours_Worked: {
    type: Number,
    default: 0,
  },
  Break_Time: {
    type: Number,
    default: 0,
  },
  breakStart: {
    // Changed to consistent camelCase
    type: Date,
  },
  breakEnd: {
    // Changed to consistent camelCase
    type: Date,
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  Location: { type: String },
})

export const AttendanceModel = mongoose.model('Attendance', AttendanceSchema)
