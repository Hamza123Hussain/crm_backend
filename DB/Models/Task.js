import mongoose from 'mongoose'

// Define the Task Schema
const TaskSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    enum: ['TODO', 'Minor_progress', 'IN_PROGRESS', 'DONE'],
    default: 'TODO',
  },
  assignedTo: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  TaskCompletion: {
    type: Number,
    default: 0,
  },
  TotalPoints: {
    type: Number,
    default: 0, // Default value for TotalPoints
  },
  PointsGained: {
    type: Number,
    default: 0, // Default value for PointsGained
  },
  TaskType: {
    type: String,
    enum: ['Daily', 'Weekly', 'Other'],
    default: 'Daily',
  },
})

// Create and export the Task model
export const TaskModel = mongoose.model('Task', TaskSchema)
