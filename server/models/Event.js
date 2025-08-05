import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: String,
  desc: String,
  capacity: Number,
  roles: [String],
  time: { start: Date, end: Date },
  questions: [String],
  join_type: {
    type: String,
    enum: ["open", "community", "invite"],
    default: "community",
  },
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String },
      answers: { type: [String] },
    },
  ],
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
});

export default mongoose.model("Event", eventSchema);
