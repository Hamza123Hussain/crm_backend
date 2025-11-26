// models/Transaction.js
import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    studentId: {
      // optional - reference to Student._id (Number in your schema). Use Number or String based on your Student model.
      type: Number,
      required: false,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    mode: {
      type: String,
      enum: ['Cash', 'Online Transfer', 'Cheque'],
      required: true,
    },
    bankName: {
      type: String,
      default: '',
      trim: true,
    },
    createdBy: {
      type: String,
      default: null,
    },
    // optional metadata
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
)

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model('Transaction', TransactionSchema)
