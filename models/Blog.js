import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // If you have existing blogs with no user, comment out `required: true`
      // required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);