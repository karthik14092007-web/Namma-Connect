// server/models/Campaign.js
const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    founderId: { type: String, required: true },
    productName: { type: String, required: true },
    productId: { type: String },
    goal: {
      type: String,
      enum: ["Awareness", "Website visits", "Product sales", "Leads"],
      default: "Product sales"
    },
    targetAudience: { type: String, required: true },
    location: { type: String, default: "Tamil Nadu & South India" },
    budget: { type: Number, default: 500 },
    dailyBudget: { type: Number, default: 250 },
    durationDays: { type: Number, default: 7 },
    status: { type: String, default: "Active" },
    reach: { type: Number, default: 0 },
    relevantAudiencePercent: { type: Number, default: 72 },
    productViews: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    costPerConversion: { type: String, default: "₹18.50" },
    roas: { type: String, default: "3.2x" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
