import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  displayName?: string;
  email: string;
  joined: string;
  phoneNumber?: number;
  description?: string;
  photoURL: string;
}

const User = new mongoose.Schema({
  _id: { type: String, required: true },
  displayName: { type: String, required: false},
  email: { type: String, required: true },
  joined: { type: Date, required: true },
  phoneNumber: { type: Number, required: false },
  description: { type: String, required: false, default: "" },
  photoURL: {
    type: String,
    required: false,
    default: "https://via.placeholder.com/150",
  },
});

export default mongoose.model<UserDocument>("User", User);
