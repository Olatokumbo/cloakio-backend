import mongoose from "mongoose";

const PosterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
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
  posterURLs: {
    type: [String],
    required: false,
  },
});

export default mongoose.model("Poster", PosterSchema);
