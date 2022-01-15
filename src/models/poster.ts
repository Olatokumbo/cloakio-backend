import mongoose, { Document } from "mongoose";

export interface PosterDocument extends Document {
  title: string;
  description: string;
  userId: string;
  date: string;
  category: string;
  posterKeys: string[];
  price: string;
}

const PosterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "graphics-and-design",
      "technology",
      "audio-and-music",
      "business",
      "marketing",
      "writing-and-editing",
      "education-and-training",
      "media-and-communication",
      "health",
    ],
    default: "technology",
    required: true,
  },
  posterKeys: {
    type: [String],
    required: false,
  },
});

export default mongoose.model<PosterDocument>("Poster", PosterSchema);
