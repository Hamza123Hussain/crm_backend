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
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Salary: {
    type: Number,
    required: true,
  },
  JobDescription: {
    type: String,
    required: true,
  },
  JobTitle: {
    type: String,
    required: true,
  },
})

// Create and export the User model
export const User = mongoose.model('User', UserSchema)
