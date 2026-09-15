// server/models/Notification.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    founderId: { type: String, default: "founder-kavya-1" },
    type: { type: String, default: "system" },
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: String, default: "Just now" },
    read: { type: Boolean, default: false },
    icon: { type: String, default: "bell" },
    link: { type: String, default: "/dashboard" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
