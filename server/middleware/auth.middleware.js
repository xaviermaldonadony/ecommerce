const admin = require('../firebase');
const User = require('../models/user.model');

async function authCheck(req, res, next) {
	const { authtoken } = req.headers;
	// console.log('AUTHCHECK', authtoken);
	try {
		const firebaseUser = await admin.auth().verifyIdToken(authtoken);
		// console.log('firebaseUser in authCheck', firebaseUser);
		req.user = firebaseUser;
		next();
	} catch (err) {
		// console.log('ERROR', err);
		res.status(401).json({
			error: 'Invalid or expired token',
		});
	}
}

async function adminCheck(req, res, next) {
	const { email } = req.user;

	const adminUser = await User.findOne({ email }).exec();

	if (adminUser.role !== 'admin') {
		res.status(403).json({
			error: 'Admin resource. Access denied.',
		});
	} else {
		next();
	}
}

module.exports = {
	authCheck,
	adminCheck,
};
