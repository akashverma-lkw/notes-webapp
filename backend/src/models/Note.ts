import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // should match your user model name
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
