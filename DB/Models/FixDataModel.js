import mongoose from 'mongoose'

const FixDataSchema = new mongoose.Schema(
  {
    studentId: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    country: { type: String, default: '' },
  },
  {
    timestamps: true, // ✅ createdAt and updatedAt automatically
  }
)

export const FixData = mongoose.model('FixData', FixDataSchema)
