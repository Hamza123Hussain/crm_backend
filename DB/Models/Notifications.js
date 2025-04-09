import mongoose from 'mongoose'
// Notifications Schema definition
const NotificationsSchema = new mongoose.Schema({
  StudentName: { type: String, required: true },
  StudentID: { type: Number, required: true },
  StudentTag: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Notifications expires in 5 minutes (300 seconds)
  NotificationType: { type: String, required: true }, // Type of notification (e.g., "New", "Update", etc.)
})
// Notifications Model
const Notifications = mongoose.model('Notifications', NotificationsSchema)
export default Notifications
