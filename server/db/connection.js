import mongoose from "mongoose";

const uri = process.env.ATLAS_URI || "";

try {
  await mongoose.connect(uri);
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

export default mongoose;
