const express = require('express');

const { authCheck, adminCheck } = require('../middleware/auth.middleware');
const {
	createOrUpdateUser,
	currentUser,
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;
