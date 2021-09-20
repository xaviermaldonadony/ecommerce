const User = require('../models/user.models');

async function createOrUpdateUser(req, res) {
	let { user } = req;
	// if no name prvided
	console.log(user.name);
	if (!user.name) {
		user.name = user.email.split('@')[0];
	}

	const resUser = await User.findOneAndUpdate({ email: user.email }, user, {
		upsert: true,
		new: true,
	});

	res.json(resUser);
}

async function currentUser(req, res) {
	const { email } = req.user;

	try {
		const user = await User.findOne({ email });
		// console.log('Current User', user);
		res.json(user);
	} catch (err) {
		res.json();
		throw new Error(err);
	}
}

module.exports = {
	createOrUpdateUser,
	currentUser,
};
