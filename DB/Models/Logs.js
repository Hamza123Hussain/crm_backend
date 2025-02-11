import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  Email: { type: String, required: true },
  action: {
    type: String,
    enum: ['login', 'signup', 'signout'],
    required: true,
  },
  ipAddress: { type: String },
  deviceInfo: { type: String },
  timestamp: { type: Date, default: Date.now },
})

export const LogModel = mongoose.model('Log', logSchema)
