import mongoose from "mongoose";
const { Schema } = mongoose;

const communitySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  desc: String,
  capacity: Number,
  events: [{ type: mongoose.Schema.Types.ObjectId }],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  privacy: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

communitySchema.index(
  { name: 1 },
  { unique: true },
  { collation: { locale: "en", strength: 2 } }
);
communitySchema.index(
  { desc: 1 },
  { collation: { locale: "en", strength: 2 } }
);

export default mongoose.model("Community", communitySchema);
