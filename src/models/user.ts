import mongoose from "mongoose";

const User = new mongoose.Schema({
  _id: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  joined: { type: Date, required: true },
  phoneNumber: { type: Number, required: true },
  description: { type: String, required: false, default: "" },
  photoURL: { type: String, required: true },
});

export default mongoose.model("User", User);
