import mongoose from "mongoose";
const JapanStudentSchema = new mongoose.Schema({
  // Personal Information
  personalInfo: {
    fullName: { type: String,  trim: true },
    dateOfBirth: { type: Date, },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], },
    nationality: { type: String, },
    placeOfBirth: {
      city: { type: String, },
      country: { type: String, }
    },
    nationalID: { type: String,  unique: true } // CNIC or B-Form
  },
  // Guardian / Parent Information
  guardianInfo: {
    fatherName: { type: String, },
    fatherCNIC: { type: String, },
    fatherOccupation: { type: String },
    fatherEmployer: { type: String },
    fatherContact: { type: String, },
fatherEmail:{type:String,required:true},   
 motherName: { type: String, },
    motherCNIC: { type: String, },
  },
  // School / Academic Information
  academicInfo: {
    grade: { type: String, },
    rollNumber: { type: String, },
    schoolName: { type: String, default: 'Trinity Lahore' },
    schoolAddress: { type: String, }
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
    parentSignatureConsent: { type: Boolean, },
    mediaConsent: { type: Boolean, },
    accuracyDeclaration: { type: Boolean, }
  },
  submissionDate: { type: Date, default: Date.now }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});
export const JapanStudent = mongoose.model('JapanStudent', JapanStudentSchema);