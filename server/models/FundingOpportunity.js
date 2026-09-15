// server/models/FundingOpportunity.js
const mongoose = require("mongoose");

const fundingOpportunitySchema = new mongoose.Schema(
  {
    provider: { type: String, required: true },
    organization: { type: String },
    category: {
      type: String,
      enum: ["Angel Investors", "Seed Funds", "Grants", "Government Schemes", "Business Loans", "Microfinance"],
      default: "Government Schemes"
    },
    fundingRange: { type: String },
    type: { type: String },
    eligibleStages: [{ type: String }],
    targetFocus: { type: String },
    deadline: { type: String },
    locationScope: { type: String },
    industryScope: [{ type: String }],
    actionUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FundingOpportunity", fundingOpportunitySchema);
