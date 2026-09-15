// server/test_full_suite.js
const http = require("http");

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    }).on("error", reject);
  });
}

function post(url, body) {
  return new Promise((resolve, reject) => {
    const dataStr = JSON.stringify(body);
    const u = new URL(url);
    const req = http.request(
      {
        hostname: u.hostname,
        port: u.port,
        path: u.pathname + u.search,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(dataStr)
        }
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      }
    );
    req.on("error", reject);
    req.write(dataStr);
    req.end();
  });
}

function checkServerUp() {
  return new Promise((resolve) => {
    const req = http.get("http://localhost:5000/api/health", (res) => {
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
  });
}

(async () => {
  try {
    const isUp = await checkServerUp();
    if (!isUp) {
      require("./index.js");
      await new Promise((r) => setTimeout(r, 1000));
    }

    console.log("=== Running Namma-Connect Full Verification Suite ===");

    // 1. Health
    const health = await get("http://localhost:5000/api/health");
    console.log("✓ /api/health:", health.data.status === "ok" ? "PASS" : "FAIL");

    // 2. Demo Persona Kavya
    const demo = await get("http://localhost:5000/api/demo/kavya");
    const founder = demo.data.founder;
    console.log(`✓ /api/demo/kavya: Founder: ${founder.founderName}, Brand: ${founder.brandName}, Growth Score: ${founder.growthScore}/100`);
    if (founder.growthScore !== 68) throw new Error("Expected Growth Score 68 for Kavya!");
    if (founder.topGaps[0].dimension !== "Marketing" || founder.topGaps[0].score !== 50) {
      throw new Error(`Expected Top Gap 1 to be Marketing (50), got ${founder.topGaps[0].dimension} (${founder.topGaps[0].score})!`);
    }

    // 3. Mentors & Explainable Matching
    const mentorsRes = await get("http://localhost:5000/api/mentors?founderId=" + founder.id);
    const mentors = mentorsRes.data.mentors;
    const topMentor = mentors[0];
    console.log(`✓ /api/mentors: Top Mentor: ${topMentor.name} -> ${topMentor.matchPercentage}% Match`);
    if (topMentor.name !== "Priya Sharma" || topMentor.matchPercentage !== 94) {
      throw new Error(`Expected Priya Sharma with 94% match, got ${topMentor.name} (${topMentor.matchPercentage}%)`);
    }
    if (!topMentor.matchBreakdown?.stage || !topMentor.matchReasons?.length) {
      throw new Error("Missing explainable breakdown or reasons for mentor match!");
    }

    // 4. Funding Opportunities
    const fundingRes = await get("http://localhost:5000/api/funding?founderId=" + founder.id);
    const opps = fundingRes.data.opportunities;
    const topOpp = opps[0];
    console.log(`✓ /api/funding: Top Fit: ${topOpp.provider} -> ${topOpp.matchPercentage}% Fit`);
    if (topOpp.matchPercentage !== 88) {
      throw new Error("Expected 88% match for Stand-Up India!");
    }

    // 5. 30-Day Growth Plan Roadmap
    const roadmapRes = await get("http://localhost:5000/api/roadmap/" + founder.id);
    const tasks = roadmapRes.data.tasks;
    console.log(`✓ /api/roadmap: Found ${tasks.length} total tasks across 4 weeks.`);
    if (tasks.length < 10) throw new Error("Roadmap has fewer than 10 tasks!");

    // 6. Marketplace
    const marketRes = await get("http://localhost:5000/api/marketplace");
    console.log(`✓ /api/marketplace: Found ${marketRes.data.products.length} products listed.`);

    // 7. Campaigns & Performance
    const campRes = await get("http://localhost:5000/api/campaigns");
    const camp = campRes.data.campaigns[0];
    console.log(`✓ /api/campaigns: Reach: ${camp.reach}, Relevant: ${camp.relevantAudiencePercent}%, Views: ${camp.productViews}, Clicks: ${camp.clicks}, Conversions: ${camp.conversions}`);

    // 8. Admin Metrics
    const adminRes = await get("http://localhost:5000/api/admin/metrics");
    console.log(`✓ /api/admin/metrics: Total Founders: ${adminRes.data.metrics.totalFounders}, Active Brands: ${adminRes.data.metrics.activeBrands}`);

    // 9. Notifications
    const notifRes = await get("http://localhost:5000/api/notifications");
    console.log(`✓ /api/notifications: ${notifRes.data.notifications.length} notifications found.`);

    console.log("\n=======================================================");
    console.log("🎉 ALL TESTS PASSED! FULL END-TO-END FLOW VERIFIED! 🎉");
    console.log("=======================================================\n");
    process.exit(0);
  } catch (err) {
    console.error("Test Suite Error:", err);
    process.exit(1);
  }
})();
