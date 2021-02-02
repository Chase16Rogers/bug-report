import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Note = new Schema(
  {
    content: { type: String, required: true },
    bugId: { type: String, required: true },
    flagged: { type: String },
    creatorId: { type: String, required: true },
    creator: { type: Object, required: true }
  },
  { timestamps: true }
)

export default Note
