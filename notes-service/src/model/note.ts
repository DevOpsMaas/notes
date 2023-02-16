import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: { type: String },
    title: { type: String },
    body: { type: String },
});

module.exports = mongoose.model("notes", noteSchema);