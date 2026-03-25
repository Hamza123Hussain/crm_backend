import mongoose from 'mongoose'

const PotentialReportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    country: { type: String, default: '' },
    LastNote: { type: String, default: '' },
    ContactedDate: { type: Date },
  },
  {
    timestamps: true, // ✅ createdAt and updatedAt automatically
  },
)

export const PotentialReport = mongoose.model(
  'PotentialReport',
  PotentialReportSchema,
)
