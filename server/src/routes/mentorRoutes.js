// server/src/routes/mentorRoutes.js
const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const { requireAuth } = require('../middleware/auth');

router.get('/', mentorController.listMentors);
router.get('/:id', mentorController.getMentor);
router.post('/matches', requireAuth, mentorController.requestMatch);

module.exports = router;
