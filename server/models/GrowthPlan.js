// server/models/GrowthPlan.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: String,
  week: Number,
  weekTitle: String,
  title: String,
  description: String,
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "High"
  },
  estimatedEffort: String,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  },
  dimension: String,
  actionLabel: String,
  deliverable: String
});

const growthPlanSchema = new mongoose.Schema(
  {
    founderId: { type: String, required: true },
    tasks: [taskSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("GrowthPlan", growthPlanSchema);
