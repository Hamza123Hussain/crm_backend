import mongoose from 'mongoose'
const NotesSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Text: {
      type: String,
    },
    AttachedWith: {
      type: [String], // Array of strings
    },
  },
  { timestamps: true }
)
export const Notes = mongoose.model('Notes', NotesSchema)
