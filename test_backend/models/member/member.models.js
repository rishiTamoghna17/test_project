const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    age: { type: Number, required: true },
    blood_group: { type: String },
    type: { type: String, enum: ["child", "mother", "father", "teacher"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Member", memberSchema);
