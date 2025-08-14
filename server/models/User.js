import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: { type: String, unique: true },
  name: String,
  email: String,
  password: String,
  communities: [{ type: mongoose.Schema.Types.ObjectId }],
  events: [{ type: mongoose.Schema.Types.ObjectId }],
  admins: [{ type: mongoose.Schema.Types.ObjectId }],
  bio: String,
});

export default mongoose.model("User", userSchema);
