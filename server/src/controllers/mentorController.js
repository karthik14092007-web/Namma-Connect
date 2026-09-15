// server/src/controllers/mentorController.js
const mentorService = require('../services/mentorService');
const { success, error } = require('../utils/apiResponse');

async function listMentors(req, res) {
  try {
    const { expertise, location, page, limit } = req.query;
    const founderId = req.user?.userId;
    const result = await mentorService.listMentors({ founderId, expertise, location, page, limit });
    return success(res, result, 200);
  } catch (err) {
    return error(res, err.message, 'LIST_MENTORS_FAILED', 500);
  }
}

async function getMentor(req, res) {
  try {
    const mentor = await mentorService.getMentorById(req.params.id);
    return success(res, { mentor }, 200);
  } catch (err) {
    return error(res, err.message, 'GET_MENTOR_FAILED', err.statusCode || 404);
  }
}

async function requestMatch(req, res) {
  try {
    const match = await mentorService.requestMentorMatch(req.user.userId, req.body, req.ip);
    return success(res, { match, message: 'Consultation requested successfully' }, 201);
  } catch (err) {
    return error(res, err.message, 'REQUEST_MATCH_FAILED', 400);
  }
}

module.exports = {
  listMentors,
  getMentor,
  requestMatch
};
