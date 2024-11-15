import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  preferredCountry: {
    type: String,
  },
  otherCountry: {
    type: String,
  },
  academicLevel1: {
    type: String,
  },
  level1Marks: {
    type: String,
  },
  level1Year: {
    type: String,
  },
  academicLevel2: {
    type: String,
  },
  level2Marks: {
    type: String,
  },
  level2Year: {
    type: String,
  },
  bachelorDegree: {
    type: String,
  },
  bachelorCGPA: {
    type: String,
  },
  bachelorYear: {
    type: String,
  },
  masterDegree: {
    type: String,
  },
  masterCGPA: {
    type: String,
  },
  masterYear: {
    type: String,
  },
  educationLevel: {
    type: String,
  },
  primaryCoursePreference: {
    type: String,
  },
  secondaryCoursePreference: {
    type: String,
  },
  languageTest: {
    type: String,
  },
  languageTestScore: {
    type: String,
  },
  budget: {
    type: String,
  },
  visaHistory: {
    type: String,
  },
  preferredCounselingMode: {
    type: String,
  },
  heardAboutUs: {
    type: String,
  },
  // New fields
  attestedByHEC: {
    type: Boolean,
    default: false,
  },
  attestedByForeignOffice: {
    type: Boolean,
    default: false,
  },
  studentTag: {
    type: String,
    enum: ['NEW', 'SIGNED UP', 'POTENTIAL', 'Not Interested'],
    default: 'NEW', // Default value for new students
  },
  status: {
    type: String,
    enum: [
      'not_interested',
      'plan_postponed',
      'next_year_intake',
      'documents_to_send',
      'document_received',
    ],
    default: '',
  },
  notes: {
    type: String, // New notes field to store additional information
    default: 'No Notes Added', // Default to an empty string if no notes are provided
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Create and export the Student model
export const Student = mongoose.model('Student', StudentSchema)
