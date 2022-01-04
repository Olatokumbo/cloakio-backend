import mongoose from "mongoose";

const User = new mongoose.Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  joined: { type: Date, required: true },
  phoneNumber: { type: Number, required: false },
  description: { type: String, required: true },
});

export default mongoose.model("User", User);
