// server/models/Mentor.js
const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    experienceYears: { type: Number, default: 10 },
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 25 },
    startupsSupported: { type: Number, default: 20 },
    location: { type: String },
    languages: [{ type: String }],
    consultationFee: { type: String, default: "₹499 / session" },
    feeAmount: { type: Number, default: 499 },
    availability: { type: String },
    avatarUrl: { type: String },
    specialties: [{ type: String }],
    industries: [{ type: String }],
    stageFocus: [{ type: String }],
    proofOfWork: { type: String },
    bio: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mentor", mentorSchema);
