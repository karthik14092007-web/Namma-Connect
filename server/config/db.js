// server/config/db.js
const mongoose = require("mongoose");
const {
  demoFounder,
  seedMentors,
  seedFundingOpportunities,
  seedProducts,
  seedGrowthPlanTasks,
  seedCampaigns,
  seedNotifications
} = require("../data/seedData");

let isMongoConnected = false;

// In-memory data store fallback
const inMemoryStore = {
  founders: [JSON.parse(JSON.stringify(demoFounder))],
  mentors: JSON.parse(JSON.stringify(seedMentors)),
  fundingOpportunities: JSON.parse(JSON.stringify(seedFundingOpportunities)),
  products: JSON.parse(JSON.stringify(seedProducts)),
  growthPlanTasks: JSON.parse(JSON.stringify(seedGrowthPlanTasks)),
  campaigns: JSON.parse(JSON.stringify(seedCampaigns)),
  notifications: JSON.parse(JSON.stringify(seedNotifications)),
  consultationBookings: []
};

async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/namma-connect";
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully to ${uri}`);
  } catch (err) {
    isMongoConnected = false;
    console.log(`[MongoDB] Notice: Native MongoDB daemon not reachable (${err.message}).`);
    console.log(`[Storage] Seamless In-Memory Resilient Store activated. Full API operational.`);
  }
}

function getStore() {
  return inMemoryStore;
}

function resetDemoData() {
  inMemoryStore.founders = [JSON.parse(JSON.stringify(demoFounder))];
  inMemoryStore.mentors = JSON.parse(JSON.stringify(seedMentors));
  inMemoryStore.fundingOpportunities = JSON.parse(JSON.stringify(seedFundingOpportunities));
  inMemoryStore.products = JSON.parse(JSON.stringify(seedProducts));
  inMemoryStore.growthPlanTasks = JSON.parse(JSON.stringify(seedGrowthPlanTasks));
  inMemoryStore.campaigns = JSON.parse(JSON.stringify(seedCampaigns));
  inMemoryStore.notifications = JSON.parse(JSON.stringify(seedNotifications));
  inMemoryStore.consultationBookings = [];
  return inMemoryStore.founders[0];
}

module.exports = {
  connectDB,
  isMongoConnected: () => isMongoConnected,
  getStore,
  resetDemoData
};
