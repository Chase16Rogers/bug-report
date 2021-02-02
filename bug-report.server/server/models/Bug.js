import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Bug = new Schema(
  {
    closed: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    title: { type: String, required: true },
    closedDate: { type: String },
    creatorId: { type: String, required: true },
    creator: { type: Object, required: true }
  },
  { timestamps: true }
)

export default Bug
