// server/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    founderId: { type: String },
    founderName: { type: String },
    category: {
      type: String,
      enum: [
        "Food & Beverages",
        "Fashion",
        "Beauty",
        "Handcrafted",
        "Agriculture",
        "Home & Lifestyle",
        "Local Products"
      ],
      default: "Food & Beverages"
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    unit: { type: String },
    location: { type: String },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 12 },
    badge: { type: String },
    isVerified: { type: Boolean, default: true },
    image: { type: String },
    description: { type: String },
    story: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
