import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);
export default tag;
