import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  _id: {
    type: String,
    required: true, // _id is required to store the Firebase UID
  },
  imageUrl: {
    type: String,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png', // Default image if no image is uploaded
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Role: {
    type: String,
    default: 'User',
  },
  startrange: {
    type: Number,
    default: 0,
  },
  endrange: {
    type: Number,
    default: 0,
  },
})

export const User = mongoose.model('User', UserSchema)
