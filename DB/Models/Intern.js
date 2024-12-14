import mongoose from 'mongoose'
// Define the schema for intern data
const InternSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true, // Ensuring email is unique
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  EmergencyNumber: {
    type: String,
    required: true,
  },
  YourAddress: {
    type: String,
    required: true,
  },
  YourInstitute: {
    type: String,
    required: true,
  },
  YourEducation: {
    type: String,
    required: true,
  },
  YourCGPA: {
    type: String,
    required: true,
  },
  AreYouCurrentlyStudying: {
    type: String,
    enum: ['Yes', 'No'], // Limiting to Yes or No options
    required: true,
  },
  YourSemester: {
    type: String,
    required: true,
  },
  WhereDidYouHearAboutUs: {
    type: String,
    enum: [
      'Facebook',
      'Instagram',
      'Influencer',
      'Friend/Family',
      'University',
      'Advertisement',
    ], // Updated with the new options
    required: true,
  },
  WhatAreYourCareerGoals: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Hiring', 'Rejected', 'Accepted'], // Possible status values
    default: 'Pending', // Default value if not specified
  },
})
// Create the model based on the schema
const Intern = mongoose.model('Intern', InternSchema)
export default Intern
