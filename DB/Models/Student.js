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
      'All',
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
  OptionDetails: {
    options: [
      {
        optionName: { type: String },
        'I20/CAS Recieved': { type: Boolean },
      },
    ],
    optionspresented: {
      type: Boolean,
      default: false,
    },
    optionspresentedDate: {
      type: Date,
    },
    MOIOptions: {
      type: Boolean,
      default: false,
    },
    FeedBack: {
      type: String,
      default: false,
    },
    WithinBudget: {
      type: Boolean,
      default: false,
    },
    OptionsFinalized: {
      type: Boolean,
      default: false,
    },
  },
  VisaDetails: {
    VisaApproved: { type: Boolean },
    VisaAppointmentDate: { type: Date },
    InterviewPracticeDone: { type: Boolean },
    'DS160/UK VISA FORM FILLED': { type: Boolean },
  },
  TravelDetails: {
    TicketBooked: { type: Boolean },
    TravelDate: { type: Date },
    TicketPaymentDone: { type: Boolean },
  },
  MeetingDetails: [
    {
      MeetingDate: {
        type: Date,
        required: true,
      },
      MeetingTime: {
        type: String, // Format: "HH:mm"
        required: true,
      },
      MeetingStatus: {
        type: String,
        enum: ['Attended', 'Declined', 'Rescheduled', 'Scheduled'],
      },
      MeetingReminder: {
        type: Boolean,
        default: false,
      },
      MeetingFeedBack: {
        type: String,
        default: '',
      },
    },
  ],

  DeadlineDetails: {
    DeadlineMessageSent: {
      type: Boolean,
      default: false,
    },
    DeadlineDate: {
      type: Date,
    },
    DeadlineReminder: {
      type: Boolean,
      default: false,
    },
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
  ContactDetails: [
    {
      ContactedDate: {
        type: Date,
      },
      ContactReminder: {
        type: Date,
      },
      FollowUpMessage: {
        type: Boolean,
      },
      ResponseStatus: {
        type: String,
        enum: ['No Response', 'Unable To Connect', 'Contacted'],
      },
      DiscussedWithFamily: {
        type: Boolean,
      },
      LocationShared: {
        type: Boolean,
      },
    },
  ],

  attestedByHEC: {
    type: Boolean,
    default: false,
  },
  attestedByForeignOffice: {
    type: Boolean,
    default: false,
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
