const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
	{
		name: String,

		email: {
			type: String,
			required: true,
			// Allow us to query the data effeciently
			index: true,
		},

		role: {
			type: String,
			default: 'subscriber',
		},

		cart: {
			type: Array,
			default: [],
		},

		address: String,

		// whishlist: [{ type: ObjectId, ref: 'Product' }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
