const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middleware/auth.middleware');
const {
	create,
	read,
	update,
	remove,
	list,
} = require('../controllers/category.controller');

// routes
router.post('/category', authCheck, adminCheck, create);
router.get('/category', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);

module.exports = router;
