const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middleware/auth.middleware');
const {
	create,
	read,
	update,
	remove,
	list,
} = require('../controllers/subCategory.controller');

// routes
router.post('/subcategory', authCheck, adminCheck, create);
router.get('/subcategory', list);
router.get('/subcategory/:slug', read);
router.put('/subcategory/:slug', authCheck, adminCheck, update);
router.delete('/subcategory/:slug', authCheck, adminCheck, remove);

module.exports = router;
