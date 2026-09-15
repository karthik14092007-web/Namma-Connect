// server/models/Founder.js
const mongoose = require("mongoose");

const founderSchema = new mongoose.Schema(
  {
    founderName: { type: String, required: true },
    brandName: { type: String, required: true },
    location: { type: String, required: true },
    industry: { type: String, required: true },
    productCategory: { type: String },
    websiteUrl: { type: String },
    instagramHandle: { type: String },
    businessModel: { type: String },
    businessStage: {
      type: String,
      enum: ["Idea", "Pre-revenue", "Early traction", "Growing", "Scaling"],
      default: "Early traction"
    },
    monthlyRevenue: { type: String, default: "₹50K–₹2L" },
    actualMonthlyRevenue: { type: String },
    salesTrend: {
      type: String,
      enum: ["Growing", "Stable", "Declining", "Unpredictable"],
      default: "Unpredictable"
    },
    challenges: [{ type: String }],
    isSeekingFunding: { type: Boolean, default: true },
    fundingRequirement: { type: String },
    actualFundingRequirement: { type: String },
    fundingPurpose: [{ type: String }],
    preferredLanguage: { type: String, default: "English" },
    preferredMentorExpertise: { type: String },
    mentorshipMode: { type: String, default: "Online" },
    targetCustomer: { type: String },
    primaryMarket: { type: String },
    brandStory: { type: String },
    verified: { type: Boolean, default: true },
    proofOfWork: { type: Boolean, default: true },
    certifications: [{ type: String }],
    achievements: [{ type: String }],
    growthScore: { type: Number, default: 68 },
    scoreStatus: { type: String, default: "Growth Potential: High" },
    categoryScores: {
      product: { type: Number, default: 82 },
      sales: { type: Number, default: 63 },
      branding: { type: Number, default: 57 },
      marketing: { type: Number, default: 44 },
      customerReach: { type: Number, default: 65 },
      fundingReadiness: { type: Number, default: 70 }
    },
    topGaps: [
      {
        id: String,
        dimension: String,
        score: Number,
        diagnosis: String,
        actionText: String,
        actionUrl: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Founder", founderSchema);
