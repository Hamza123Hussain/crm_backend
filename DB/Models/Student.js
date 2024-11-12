import mongoose from 'mongoose'

// Define the student schema
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures unique email
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    country: {
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
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
)

// Create and export the Student model
export const Student = mongoose.model('Student', studentSchema)
