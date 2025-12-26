import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  createdBy: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Task || mongoose.model('Task', TaskSchema)
