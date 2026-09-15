// server/test/backend_suite.js
// Automated verification suite for Namma-Connect Production Backend Architecture

const assert = require('assert');
const app = require('../src/app');
const http = require('http');

let server;
let port = 5055;
let baseUrl = `http://localhost:${port}`;

async function request(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));
  return { status: response.status, data, headers: response.headers };
}

const { seed } = require('../../prisma/seed');

async function runTests() {
  console.log('=== Running Namma-Connect Production Backend Architecture Verification ===\n');

  // Seed benchmark data
  await seed();

  // Start temporary test server
  server = http.createServer(app);
  await new Promise(resolve => server.listen(port, resolve));

  try {
    // 1. Health Check
    console.log('Test 1: Health Check (GET /api/v1/health)');
    const health = await request('/api/v1/health');
    assert.strictEqual(health.status, 200, 'Health check should return 200');
    assert.strictEqual(health.data.service, 'namma-connect-api');
    assert.ok(health.data.database === 'connected' || health.data.database === 'disconnected');
    console.log('  ✓ /api/v1/health: PASS (Service: ' + health.data.service + ', Database: ' + health.data.database + ')\n');


    // 2. User Registration
    console.log('Test 2: User Registration (POST /api/v1/auth/register)');
    const regPayload = {
      email: `founder_${Date.now()}@maduraicrunch.com`,
      password: 'StrongPassword123!',
      firstName: 'Kavya',
      lastName: 'Sundaram',
      role: 'FOUNDER'
    };
    const reg = await request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(regPayload)
    });
    assert.strictEqual(reg.status, 201, 'Registration should return 201');
    assert.strictEqual(reg.data.success, true);
    assert.ok(reg.data.data.accessToken, 'Access token must be returned');
    assert.strictEqual(reg.data.data.user.role, 'FOUNDER');
    const founderAToken = reg.data.data.accessToken;
    const founderAId = reg.data.data.user.id;
    console.log('  ✓ Registration: PASS (User ID: ' + founderAId + ')\n');

    // 3. User Login & Invalid Password Test
    console.log('Test 3: Authentication & Password Security');
    const badLogin = await request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: regPayload.email, password: 'WrongPassword!' })
    });
    assert.strictEqual(badLogin.status, 401, 'Bad password should return 401');
    assert.strictEqual(badLogin.data.success, false);
    assert.strictEqual(badLogin.data.error.code, 'INVALID_CREDENTIALS');
    console.log('  ✓ Invalid Password rejected: PASS');

    const goodLogin = await request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: regPayload.email, password: regPayload.password })
    });
    assert.strictEqual(goodLogin.status, 200, 'Valid login should return 200');
    assert.ok(goodLogin.data.data.accessToken, 'Login token returned');
    console.log('  ✓ Valid Login: PASS\n');

    // 4. Protected Route & Token Authentication
    console.log('Test 4: Protected Route Authentication');
    const unauthMe = await request('/api/v1/auth/me');
    assert.strictEqual(unauthMe.status, 401, 'Missing token should return 401');

    const authMe = await request('/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${founderAToken}` }
    });
    assert.strictEqual(authMe.status, 200, 'Valid token should return 200');
    assert.strictEqual(authMe.data.data.user.email, regPayload.email.toLowerCase());
    console.log('  ✓ Protected Route Token Guard: PASS\n');

    // 5. RBAC Authorization: Normal founder accessing admin-only route
    console.log('Test 5: RBAC Role Authorization (Founder attempting admin route)');
    const rbacTest = await request('/api/v1/admin/users', {
      headers: { Authorization: `Bearer ${founderAToken}` }
    });
    assert.strictEqual(rbacTest.status, 403, 'Non-admin user must receive 403 Forbidden');
    assert.strictEqual(rbacTest.data.error.code, 'FORBIDDEN_ROLE');
    console.log('  ✓ RBAC Non-Admin Access Denial: PASS (Status 403 FORBIDDEN_ROLE)\n');

    // 6. Business Creation & Resource Ownership Authorization
    console.log('Test 6: Business Creation & Resource Ownership Protection');
    const bizCreate = await request('/api/v1/business', {
      method: 'POST',
      headers: { Authorization: `Bearer ${founderAToken}` },
      body: JSON.stringify({
        name: 'Madurai Millet Crunch',
        category: 'Food & Beverage',
        description: 'Native healthy roasted snacks',
        location: 'Madurai, Tamil Nadu',
        stage: 'EARLY_TRACTION',
        monthlyRevenue: '₹1.8L',
        fundingRequirement: '₹7L'
      })
    });
    assert.strictEqual(bizCreate.status, 201, 'Business creation should return 201');
    const businessAId = bizCreate.data.data.business.id;
    console.log('  ✓ Business created: PASS (Business ID: ' + businessAId + ')');

    // Register Founder B
    const founderBReg = await request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: `founderB_${Date.now()}@otherbrand.com`,
        password: 'Password123!',
        firstName: 'Suresh',
        lastName: 'Raina',
        role: 'FOUNDER'
      })
    });
    const founderBToken = founderBReg.data.data.accessToken;

    // Founder B tries to access Founder A's business
    const ownershipStealAttempt = await request(`/api/v1/business/${businessAId}`, {
      headers: { Authorization: `Bearer ${founderBToken}` }
    });
    assert.strictEqual(ownershipStealAttempt.status, 403, 'Cross-user business access must return 403');
    assert.strictEqual(ownershipStealAttempt.data.error.code, 'OWNERSHIP_REQUIRED');
    console.log('  ✓ Cross-Tenant Ownership Guard: PASS (Founder B blocked with 403 OWNERSHIP_REQUIRED)\n');

    // 7. Authoritative Diagnostic Scoring Engine
    console.log('Test 7: Authoritative Server-Side Diagnostic Scoring Engine');
    const demoAnswers = [
      { questionKey: 'product.standardization', score: 80, answerKey: 'opt_80' },
      { questionKey: 'product.purchase_validation', score: 80, answerKey: 'opt_80' },
      { questionKey: 'product.feedback_collection', score: 80, answerKey: 'opt_80' },
      { questionKey: 'product.feedback_iteration', score: 100, answerKey: 'opt_100' },

      { questionKey: 'sales.consistency', score: 60, answerKey: 'opt_60' },
      { questionKey: 'sales.revenue_tracking', score: 80, answerKey: 'opt_80' },
      { questionKey: 'sales.defined_process', score: 80, answerKey: 'opt_80' },
      { questionKey: 'sales.analytics_economics', score: 60, answerKey: 'opt_60' },

      { questionKey: 'branding.positioning_clarity', score: 60, answerKey: 'opt_60' },
      { questionKey: 'branding.differentiation', score: 60, answerKey: 'opt_60' },
      { questionKey: 'branding.visual_identity', score: 60, answerKey: 'opt_60' },
      { questionKey: 'branding.messaging_story', score: 60, answerKey: 'opt_60' },

      { questionKey: 'marketing.target_customer', score: 40, answerKey: 'opt_40' },
      { questionKey: 'marketing.acquisition_channel', score: 60, answerKey: 'opt_60' },
      { questionKey: 'marketing.performance_tracking', score: 40, answerKey: 'opt_40' },
      { questionKey: 'marketing.campaign_execution', score: 60, answerKey: 'opt_60' },

      { questionKey: 'reach.audience_access', score: 60, answerKey: 'opt_60' },
      { questionKey: 'reach.distribution_channels', score: 80, answerKey: 'opt_80' },
      { questionKey: 'reach.organic_discovery', score: 60, answerKey: 'opt_60' },
      { questionKey: 'reach.geographic_expansion', score: 80, answerKey: 'opt_80' },

      { questionKey: 'funding.financial_records', score: 80, answerKey: 'opt_80' },
      { questionKey: 'funding.capital_budgeting', score: 60, answerKey: 'opt_60' },
      { questionKey: 'funding.compliance_readiness', score: 80, answerKey: 'opt_80' },
      { questionKey: 'funding.pitch_materials', score: 80, answerKey: 'opt_80' }
    ];

    const diagSubmit = await request('/api/v1/diagnostics', {
      method: 'POST',
      headers: { Authorization: `Bearer ${founderAToken}` },
      body: JSON.stringify({
        businessId: businessAId,
        stage: 'EARLY_TRACTION',
        brandName: 'Madurai Millet Crunch',
        responses: demoAnswers
      })
    });

    assert.strictEqual(diagSubmit.status, 201, 'Diagnostic submission must return 201');
    const diagData = diagSubmit.data.data;
    assert.strictEqual(diagData.overallScore, 68, 'Overall score must mathematically equal 68');
    assert.strictEqual(diagData.factorScores.PRODUCT.score, 85, 'Product must equal 85');
    assert.strictEqual(diagData.factorScores.SALES.score, 70, 'Sales must equal 70');
    assert.strictEqual(diagData.factorScores.BRANDING.score, 60, 'Branding must equal 60');
    assert.strictEqual(diagData.factorScores.MARKETING.score, 50, 'Marketing must equal 50');
    assert.strictEqual(diagData.factorScores.REACH.score, 70, 'Reach must equal 70');
    assert.strictEqual(diagData.factorScores.FUNDING.score, 75, 'Funding must equal 75');
    console.log(`  ✓ Mathematical Factor Calculations: PASS`);
    console.log(`    Product: ${diagData.factorScores.PRODUCT.score} (Weight: 20%)`);
    console.log(`    Sales: ${diagData.factorScores.SALES.score} (Weight: 20%)`);
    console.log(`    Branding: ${diagData.factorScores.BRANDING.score} (Weight: 15%)`);
    console.log(`    Marketing: ${diagData.factorScores.MARKETING.score} (Weight: 20%)`);
    console.log(`    Reach: ${diagData.factorScores.REACH.score} (Weight: 15%)`);
    console.log(`    Funding: ${diagData.factorScores.FUNDING.score} (Weight: 10%)`);
    console.log(`    Overall Growth Score: ${diagData.overallScore}/100 (${diagData.maturityLabel})\n`);

    // 8. Bottlenecks & Next Best Action
    console.log('Test 8: Bottleneck Detection & Next Best Action');
    assert.ok(diagData.topGaps.length >= 2, 'Must detect at least 2 top gaps');
    assert.strictEqual(diagData.topGaps[0].factor, 'MARKETING');
    assert.ok(diagData.nextBestAction.title.includes('Positioning') || diagData.nextBestAction.title.includes('Customer'));
    console.log(`  ✓ Primary Bottleneck: ${diagData.topGaps[0].factor} (${diagData.topGaps[0].score}/100 - ${diagData.topGaps[0].label})`);
    console.log(`  ✓ Next Best Action: "${diagData.nextBestAction.title}"`);
    console.log(`  ✓ Bottleneck Rule Evaluation: PASS\n`);

    // 9. 30-Day Growth Plan Milestones
    console.log('Test 9: 30-Day Growth Plan Milestones');
    const planRes = await request(`/api/v1/growth-plan/${businessAId}`, {
      headers: { Authorization: `Bearer ${founderAToken}` }
    });
    assert.strictEqual(planRes.status, 200);
    const plan = planRes.data.data.growthPlan;
    assert.ok(plan.tasks.length > 0, 'Plan must contain generated milestones');
    const actionId = plan.tasks[0].id;

    // Complete milestone
    const completeAction = await request(`/api/v1/growth-plan/${plan.id}/actions/${actionId}/complete`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${founderAToken}` },
      body: JSON.stringify({ status: 'COMPLETED' })
    });
    assert.strictEqual(completeAction.status, 200);
    console.log(`  ✓ Growth Plan Progress: ${completeAction.data.data.progress.completed}/${completeAction.data.data.progress.total} tasks completed (${completeAction.data.data.progress.percent}%): PASS\n`);

    // 10. Explainable Mentor Matching
    console.log('Test 10: Explainable Mentor Matching');
    const mentorsRes = await request('/api/v1/mentors');
    assert.strictEqual(mentorsRes.status, 200);
    const topMentor = mentorsRes.data.data.mentors[0];
    assert.ok(topMentor.matchPercentage >= 85, 'Top mentor must have high match score');
    console.log(`  ✓ Top Mentor Match: ${topMentor.name} -> ${topMentor.matchPercentage}% Match`);
    console.log(`  ✓ Match Reasons: ${topMentor.matchReasons.join(', ')}`);
    console.log(`  ✓ Mentor Matching: PASS\n`);

    // 11. Funding Schemes
    console.log('Test 11: Funding Schemes & Applications');
    const fundRes = await request('/api/v1/funding');
    assert.strictEqual(fundRes.status, 200);
    const topFund = fundRes.data.data.opportunities[0];
    assert.ok(topFund.matchPercentage >= 80);
    console.log(`  ✓ Top Funding Fit: ${topFund.name} -> ${topFund.matchPercentage}% Fit`);

    const applyRes = await request(`/api/v1/funding/${topFund.id}/apply`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${founderAToken}` },
      body: JSON.stringify({ businessId: businessAId, notes: 'Applying for collateral-free MSME grant.' })
    });
    assert.strictEqual(applyRes.status, 201);
    console.log(`  ✓ Funding Application Status: ${applyRes.data.data.application.status}: PASS\n`);

    // 12. Campaign Creation & Analytics
    console.log('Test 12: Targeted Campaign & Performance Analytics');
    const campRes = await request('/api/v1/campaigns', {
      method: 'POST',
      headers: { Authorization: `Bearer ${founderAToken}` },
      body: JSON.stringify({
        businessId: businessAId,
        title: 'Samai Crisps Launch Reel',
        budget: 500,
        campaignType: 'PRODUCT_LAUNCH',
        objective: 'PRODUCT_SALES'
      })
    });
    assert.strictEqual(campRes.status, 201);
    const camp = campRes.data.data.campaign;
    console.log(`  ✓ Campaign Launched: Reach=${camp.reach}, Conversions=${camp.conversions}: PASS\n`);

    // 13. Marketplace Products
    console.log('Test 13: Marketplace Product Operations');
    const prodRes = await request('/api/v1/marketplace');
    assert.strictEqual(prodRes.status, 200);
    assert.ok(prodRes.data.data.products.length > 0, 'Products listed');
    console.log(`  ✓ Marketplace Products Listed: ${prodRes.data.data.products.length} products: PASS\n`);

    // 14. Notifications
    console.log('Test 14: Notification Center');
    const notifRes = await request('/api/v1/notifications', {
      headers: { Authorization: `Bearer ${founderAToken}` }
    });
    assert.strictEqual(notifRes.status, 200);
    console.log(`  ✓ Notifications Found: ${notifRes.data.data.notifications.length} (${notifRes.data.data.unreadCount} unread): PASS\n`);

    console.log('===============================================================');
    console.log('🎉 ALL 14 PRODUCTION BACKEND ARCHITECTURE TESTS PASSED! 🎉');
    console.log('===============================================================');
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error('\n❌ Test Suite Failed:', err);
  if (server) server.close();
  process.exit(1);
});
