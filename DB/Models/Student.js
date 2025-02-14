import mongoose from 'mongoose'
const StudentSchema = new mongoose.Schema({
  _id: {
    type: Number,
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
    type: String, // Specify the type explicitly
    enum: ['NEW', 'SIGNED UP', 'POTENTIAL', 'Not Interested'],
    default: 'NEW',
  },
  VisitDate: {
    type: Date,
  },
  status: {
    type: [String], // Specify type as an array of strings
    enum: [
      'None',
      'not_interested',
      'plan_postponed',
      'next_year_intake',
      'documents_to_send',
      'To_Visit',
      'document_received',
      'To_Call',
      'Contacted',
      'High_Budget',
    ],
    default: ['All'], // Match the array type
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
  updatedBy: {
    type: String,
  },
  YearIntake: {
    type: String,
  },
  Refferal: {
    type: String,
  },
  StudentVisited: {
    type: Boolean,
  },
  DocumentCheckList: {
    CV: { type: Boolean, default: false },
    CoverLetterOrPersonalStatement: { type: Boolean, default: false },
    CopyOfPassport: { type: Boolean, default: false },
    MatricOrOLevelTranscript: { type: Boolean, default: false },
    IntermediateOrALevelTranscript: { type: Boolean, default: false },
    IELTS6Bands: { type: Boolean, default: false },
    BSDegree: { type: Boolean, default: false },
    BSTranscript: { type: Boolean, default: false },
    languageTest: { type: Boolean, default: false },
    ReferenceLetters: { type: Boolean, default: false },
  },
  PaymentCheckList: {
    FirstInstallmentPaid: { type: Boolean, default: false },
    RemainingPaymentPaid: { type: Boolean, default: false },
    PackageSelected: { type: String },
    PackagePrice: { type: Number },
    PaymentDone: { type: Number },
    PaymentRemaining: { type: Number },
    Discount: { type: Number },
  },
})
export const Student = mongoose.model('Student', StudentSchema)
