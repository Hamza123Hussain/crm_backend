import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    assignedTo: {
      type: String,
    },

    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },

    dueDate: {
      type: Date,
    },

    createdBy: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
     notes: [
      {
        description: { type: String, required: true },
        addedBy: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: false,
  },
)

export default mongoose.models.TaskBoard ||
  mongoose.model('TaskBoard', TaskSchema)
