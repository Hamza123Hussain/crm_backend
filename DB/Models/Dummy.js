import { Schema, model } from 'mongoose'

// Define the schema for the collection
const DummySchema = new Schema({
  ID: { type: Number, required: false },
  'Full Name': { type: String, required: false },
  Email: { type: String, required: false, unique: false },
  'Phone Number': { type: String, required: false },
  'Your City': { type: String, required: false },
  'Preferred Countries': { type: String, required: false },
  'Academic Level 1': { type: String, required: false },
  'Academic Level 2': { type: String, required: false },
  'Bachelor Degree / Similar Diploma': { type: String, required: false },
  'Master Degree': { type: String, required: false },
  'Which level of education do you want to apply for?': {
    type: String,
    required: false,
  },
  'Primary Course Preference': { type: String, required: false },
  'Secondary Course Preference': { type: String, required: false },
  'Language Test': { type: String, required: false },
  'Average Budget (PKR)': { type: String, required: false },
  'Any Visa History we should know about? (leave blank if none)': {
    type: String,
    default: 'none',
  },
  'Appointment Method': { type: String, required: false },
  'Hear About us': { type: String, required: false },
  Status: { type: String, required: false },

  studentTag: {
    type: String,
    enum: ['NEW', 'SIGNED UP', 'POTENTIAL', 'Not Interested'],
    default: 'NEW',
  },
})

// Create the model from the schema
const DummyModel = model('Dummy', DummySchema)

export default DummyModel
