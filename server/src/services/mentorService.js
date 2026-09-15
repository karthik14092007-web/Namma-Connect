// server/src/services/mentorService.js
const { db } = require('../lib/prisma');
const { logAudit } = require('./auditService');

/**
 * Computes transparent, rule-based mentor match score
 * Industry match: +30
 * Stage match: +25
 * Expertise match: +20
 * Location match: +15
 * Language match: +10
 * Total Max: 100
 */
function calculateMentorMatch(founder, mentor) {
  let score = 0;
  const reasons = [];
  const breakdown = [];

  const founderIndustry = (founder?.industry || founder?.category || 'Food & Beverages').toLowerCase();
  const mentorIndustries = (mentor.industries || '').toLowerCase();
  if (mentorIndustries.includes('food') || mentorIndustries.includes(founderIndustry) || founderIndustry.includes('food')) {
    score += 30;
    reasons.push('Direct experience in D2C Healthy Food & Consumer Goods');
    breakdown.push({ criteria: 'Industry & Sector Match', points: 30, max: 30 });
  } else {
    score += 15;
    reasons.push('Broad D2C retail product experience');
    breakdown.push({ criteria: 'Industry & Sector Match', points: 15, max: 30 });
  }

  const founderStage = (founder?.stage || founder?.businessStage || 'Early traction').toLowerCase();
  const mentorStage = (mentor.stageExperience || '').toLowerCase();
  if (mentorStage.includes('early') || mentorStage.includes('traction') || founderStage.includes('early')) {
    score += 25;
    reasons.push('Proven track record scaling brands through Early Traction');
    breakdown.push({ criteria: 'Startup Stage Relevance', points: 25, max: 25 });
  } else {
    score += 15;
    breakdown.push({ criteria: 'Startup Stage Relevance', points: 15, max: 25 });
  }

  const mentorExpertise = (mentor.expertise || '').toLowerCase();
  if (mentorExpertise.includes('marketing') || mentorExpertise.includes('brand') || mentorExpertise.includes('growth')) {
    score += 20;
    reasons.push('Specialized expertise in Brand Positioning & D2C Marketing');
    breakdown.push({ criteria: 'Functional Skill Alignment', points: 20, max: 20 });
  } else {
    score += 12;
    breakdown.push({ criteria: 'Functional Skill Alignment', points: 12, max: 20 });
  }

  const founderLocation = (founder?.location || 'Tamil Nadu').toLowerCase();
  const mentorLocation = (mentor.location || '').toLowerCase();
  if (mentorLocation.includes('tamil') || mentorLocation.includes('chennai') || founderLocation.includes('tamil')) {
    score += 15;
    reasons.push('Deep familiarity with Tamil Nadu & South Indian consumer markets');
    breakdown.push({ criteria: 'Regional Market Expertise', points: 15, max: 15 });
  } else {
    score += 8;
    breakdown.push({ criteria: 'Regional Market Expertise', points: 8, max: 15 });
  }

  const founderLang = (founder?.preferredLanguage || 'English').toLowerCase();
  const mentorLang = (mentor.languages || '').toLowerCase();
  if (mentorLang.includes('tamil') || mentorLang.includes(founderLang)) {
    score += 10;
    reasons.push('Fluent in preferred languages (English, Tamil)');
    breakdown.push({ criteria: 'Language & Communication', points: 10, max: 10 });
  } else {
    score += 5;
    breakdown.push({ criteria: 'Language & Communication', points: 5, max: 10 });
  }

  const finalScore = Math.min(100, Math.max(0, score));

  return {
    matchPercentage: finalScore,
    reasons,
    breakdown
  };
}

async function listMentors({ founderId, expertise, location, page = 1, limit = 20 }) {
  const take = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
  const skip = (Math.max(1, parseInt(page, 10) || 1) - 1) * take;

  const allMentors = await db.mentorProfile.findMany();
  let founder = null;

  if (founderId) {
    founder = await db.user.findUnique({ where: { id: founderId } });
    if (founder) {
      founder.profile = await db.founderProfile.findFirst({ where: { userId: founder.id } });
      founder.business = await db.business.findFirst({ where: { founderId: founder.id } });
    }
  }

  let filtered = allMentors;
  if (expertise) {
    const expLower = expertise.toLowerCase();
    filtered = filtered.filter(m => m.expertise.toLowerCase().includes(expLower));
  }
  if (location) {
    const locLower = location.toLowerCase();
    filtered = filtered.filter(m => m.location.toLowerCase().includes(locLower));
  }

  const scoredMentors = filtered.map(mentor => {
    const match = calculateMentorMatch(founder || { location: 'Tamil Nadu', category: 'Food & Beverages' }, mentor);
    return {
      ...mentor,
      matchPercentage: match.matchPercentage,
      matchReasons: match.reasons,
      matchBreakdown: match.breakdown
    };
  });

  scoredMentors.sort((a, b) => b.matchPercentage - a.matchPercentage);
  const paginated = scoredMentors.slice(skip, skip + take);

  return {
    total: filtered.length,
    page: parseInt(page, 10) || 1,
    limit: take,
    mentors: paginated
  };
}

async function getMentorById(id, founder) {
  const mentor = await db.mentorProfile.findUnique({ where: { id } });
  if (!mentor) {
    const error = new Error('Mentor profile not found');
    error.statusCode = 404;
    throw error;
  }

  const match = calculateMentorMatch(founder || { location: 'Tamil Nadu', category: 'Food & Beverages' }, mentor);
  return {
    ...mentor,
    matchPercentage: match.matchPercentage,
    matchReasons: match.reasons,
    matchBreakdown: match.breakdown
  };
}

async function requestMentorMatch(founderId, { mentorId, businessId, date, timeSlot, notes }, ipAddress) {
  const mentor = await db.mentorProfile.findUnique({ where: { id: mentorId } });
  if (!mentor) {
    const error = new Error('Mentor profile not found');
    error.statusCode = 404;
    throw error;
  }

  const matchData = calculateMentorMatch({ location: 'Tamil Nadu' }, mentor);

  const match = await db.mentorMatch.create({
    data: {
      founderId,
      mentorId,
      businessId: businessId || null,
      matchScore: matchData.matchPercentage,
      matchReasons: matchData.reasons,
      status: 'PENDING',
      date: date || 'Next Monday',
      timeSlot: timeSlot || '4:00 PM - 4:45 PM',
      notes: notes || 'Consultation on growth roadmap and brand positioning.'
    }
  });

  await db.notification.create({
    data: {
      userId: founderId,
      title: `Consultation Requested: ${mentor.name || 'Mentor Session'}`,
      message: `🤝 Meeting request submitted for ${match.date} at ${match.timeSlot}. Mentor will confirm shortly.`,
      type: 'MENTOR_MATCH',
      read: false,
      link: '/mentors'
    }
  });

  await logAudit({
    userId: founderId,
    action: 'MENTOR_REQUESTED',
    entity: 'MentorMatch',
    entityId: match.id,
    ipAddress
  });

  return match;
}

module.exports = {
  calculateMentorMatch,
  listMentors,
  getMentorById,
  requestMentorMatch
};
