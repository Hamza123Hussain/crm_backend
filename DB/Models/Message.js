import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
})

export const Message = mongoose.model('Message', MessageSchema)
