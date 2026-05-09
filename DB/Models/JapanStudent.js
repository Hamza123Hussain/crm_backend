import mongoose from "mongoose";
const JapanStudentSchema = new mongoose.Schema({
  // Personal Information
  personalInfo: {
    fullName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    nationality: { type: String, required: true },
    placeOfBirth: {
      city: { type: String, required: true },
      country: { type: String, required: true }
    },
    nationalID: { type: String, required: true, unique: true } // CNIC or B-Form
  },
  // Guardian / Parent Information
  guardianInfo: {
    fatherName: { type: String, required: true },
    fatherCNIC: { type: String, required: true },
    fatherOccupation: { type: String },
    fatherEmployer: { type: String },
    fatherContact: { type: String, required: true },
  },
  // School / Academic Information
  academicInfo: {
    grade: { type: String, required: true },
    rollNumber: { type: String, required: true },
    schoolName: { type: String, default: 'Trinity Lahore' },
    schoolAddress: { type: String, required: true }
  },
  // Health & Special Requirements
  healthInfo: {
    hasMedicalConditions: { type: Boolean, default: false },
    medicalConditionsDetail: { type: String },
    allergies: { type: String },
    dietaryRestrictions: { type: String }, // Halal, Veg, etc.
    physicalDisability: { type: String },
    isOnMedication: { type: Boolean, default: false }
  },
  // Travel History
  travelHistory: {
    hasTravelledAbroad: { type: Boolean, default: false },
    previousCountries: { type: String },
    appliedForJapaneseVisa: { type: Boolean, default: false },
    hasVisaRefusal: { type: Boolean, default: false },
    refusalDetails: { type: String }
  },
  // Consent & Metadata
  consent: {
    parentSignatureConsent: { type: Boolean, required: true },
    mediaConsent: { type: Boolean, required: true },
    accuracyDeclaration: { type: Boolean, required: true }
  },
  submissionDate: { type: Date, default: Date.now }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});
export const JapanStudent = mongoose.model('JapanStudent', JapanStudentSchema);