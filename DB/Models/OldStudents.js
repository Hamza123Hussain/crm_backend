import mongoose from 'mongoose'
export const OldStudents = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,

    default: '',
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
    default: '',
  },
  preferredCountries: {
    type: [String], // Array of strings to store multiple countries
  },
  lastresult: {
    type: String,
  },
  academicLevel1: {
    type: String,
    default: '',
  },
  level1Marks: {
    type: String,
    default: '',
  },
  level1Year: {
    type: String,
    default: '',
  },
  academicLevel2: {
    type: String,
    default: '',
  },
  level2Marks: {
    type: String,
    default: '',
  },
  level2Year: {
    type: String,
    default: '',
  },
  bachelorDegree: {
    type: String,
    default: '',
  },
  bachelorCGPA: {
    type: String,
    default: '',
  },
  bachelorYear: {
    type: String,
    default: '',
  },
  masterDegree: {
    type: String,
    default: '',
  },
  masterCGPA: {
    type: String,
    default: '',
  },
  masterYear: {
    type: String,
    default: '',
  },
  educationLevel: {
    type: String,
    default: '',
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
    default: '',
  },
  budget: {
    type: String,
  },
  visaHistory: {
    type: String,
  },
  preferredCounselingMode: {
    type: String,
    default: '',
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
      'interested',
      'Low_Budget',
      'After_Intermedidate',
      'After_Bachelors',
      'Call_Later',
      'Not_Responding',
      'Text_Dropped',
      'next_year_intake',
      'plan_postponed',
      'will_visit',
      'let_us_know',
      'document_received',
      'Options Shared',
      'High_Budget',
    ],
    default: ['All'], // Match the array type
  },
  OptionDetails: {
    options: {
      type: String,
    },
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
  Degree: { type: String },
  ProgressStatus: {
    type: [
      {
        ProgressName: { type: String },
        Completion: { type: Boolean, default: false },
      },
    ],
    default: function () {
      return [
        { ProgressName: 'Awaiting Documents', Completion: false },
        { ProgressName: 'University Selection', Completion: false },
        { ProgressName: 'Signed Up', Completion: false },
        { ProgressName: 'Applied to Universities', Completion: false },
        { ProgressName: 'Waiting for University Offers', Completion: false },
        { ProgressName: 'Offers Received', Completion: false },
        { ProgressName: 'Deposit Done', Completion: false },
        { ProgressName: 'Waiting for I-20 / CAS', Completion: false },
        { ProgressName: 'I-20 / CAS Received', Completion: false },
        { ProgressName: 'Visa Process', Completion: false },
        { ProgressName: 'Flight Booking', Completion: false },
        { ProgressName: 'Case Closed', Completion: false },
      ]
    },
  },

  VisaDetails: {
    VisaApproved: { type: Boolean },
    VisaAppointmentDate: { type: Date },
    InterviewPracticeDone: { type: Boolean },
    VISAFORMFILLED: { type: Boolean },
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
      },
      MeetingTime: {
        type: String, // Format: "HH:mm"
      },
      MeetingStatus: {
        type: String,
        enum: ['Attended', 'Declined', 'Rescheduled', 'scheduled'],
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
    default: '',
  },
  StudentVisited: {
    type: Boolean,
  },
  ContactDetails: [
    {
      ContactedDate: {
        type: Date,
      },
      ContactedTime: {
        type: String,
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
  VisitDetails: [
    {
      VisitDate: {
        type: Date,
      },
      VisitTime: {
        type: String,
      },
      VisitStatus: {
        type: String,
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
    DiscountedPrice: { type: Number },
    Discount: { type: Number },
  },
})
export const OldStudent = mongoose.model('OldStudent', OldStudents)
