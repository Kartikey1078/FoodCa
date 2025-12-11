import mongoose from "mongoose";

const crudSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },description: {
        type: String,
      },
}, { timestamps: true });

const crud = mongoose.models.crud || mongoose.model("crud", crudSchema);
export default crud;