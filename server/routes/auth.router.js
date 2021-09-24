const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middleware/auth.middleware');
const {
	createOrUpdateUser,
	currentUser,
} = require('../controllers/auth.controller');

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;
