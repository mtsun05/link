import mongoose from "mongoose";
const { Schema } = mongoose;

const tokenSchema = {
  token: String,
  user: { type: mongoose.Schema.Types.ObjectId },
  exp: Number,
};

export default mongoose.model("Token", tokenSchema);
