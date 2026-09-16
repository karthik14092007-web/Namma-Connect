// client/src/scoring/demoAnswers.js
// Authentic demo answers for Kavya (Namma Crunch - Madurai, Early Traction)
// Every score is derived directly from these observable assessment answers.
// Produces: Marketing = 52, Branding = 60, Sales = 70, Product = 80, Reach = 64, Funding = 60 -> Overall = 65

export const KAVYA_DEMO_ANSWERS = {
  // Product: (80 + 80 + 80 + 80) / 4 = 80 (Weight: 20% -> 16.0)
  prd_q1: 80, // FSSAI certified, nutrition tested, batch recipe locked
  prd_q2: 80, // Over 2,000+ units sold across South India with repeat rate > 25%
  prd_q3: 80, // Continuous review collection & feedback tracking
  prd_q4: 80, // Roasted millets with zero palm oil

  // Sales: (70 + 70 + 70 + 70) / 4 = 70 (Weight: 20% -> 14.0)
  sls_q1: 70, // Consistent monthly revenue (₹1.8L)
  sls_q2: 70, // Contribution margin tracked per SKU
  sls_q3: 70, // SLA-backed dispatch within 24 hours
  sls_q4: 70, // Repeat order interval measured

  // Branding: (60 + 60 + 60 + 60) / 4 = 60 (Weight: 15% -> 9.0)
  brd_q1: 60, // Written positioning (heritage roasted millet snacks)
  brd_q2: 60, // Differentiation communicated
  brd_q3: 60, // Defined packaging templates & visual colors
  brd_q4: 60, // Origin story documented, needs amplification

  // Marketing: (48 + 50 + 50 + 60) / 4 = 52 (Weight: 20% -> 10.4) [Primary Bottleneck]
  mkt_q1: 48, // Basic customer segment identified
  mkt_q2: 50, // One channel showing early consistency (50 -> 100 -> 50 test option)
  mkt_q3: 50, // Basic metrics occasionally checked (50 -> 100 -> 50 test option)
  mkt_q4: 60, // Regular promotions running, needs systematic optimization

  // Reach: (60 + 76 + 60 + 60) / 4 = 64 (Weight: 15% -> 9.6)
  rch_q1: 60, // Over 1,000+ customer contacts
  rch_q2: 76, // D2C online store + regional retail stockists
  rch_q3: 60, // Consistent word-of-mouth recommendations
  rch_q4: 60, // Cross-promotional pop-ups & Launch Reels micro-campaigns

  // Funding: (60 + 60 + 60 + 60) / 4 = 60 (Weight: 10% -> 6.0)
  fnd_q1: 60, // Clear ₹7L budget requirement for marketing & roasting machines
  fnd_q2: 60, // Udyam registered, GST active, separate business account
  fnd_q3: 60, // Unit economic model showing how ₹7L doubles monthly revenue
  fnd_q4: 60  // Pitch deck with traction ready for Stand-Up India & seed schemes
};
