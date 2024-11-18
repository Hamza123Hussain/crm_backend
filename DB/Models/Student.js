import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
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
  preferredCountries: {
    type: [String], // Array of strings to store multiple countries
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
    default: 'NEW',
  },
  status: {
    type: String,
    enum: [
      'All',
      'not_interested',
      'plan_postponed',
      'next_year_intake',
      'documents_to_send',
      'document_received',
    ],
    default: 'All',
  },
  notes: {
    type: String,
    default: 'No Notes Added',
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

export const Student = mongoose.model('Student', StudentSchema)
