const Category = require('../models/category.model');
const slugify = require('slugify');

async function create(req, res) {
	try {
		const { name } = req.body;
		const category = await new Category({
			name,
			slug: slugify(name).toLowerCase(),
		}).save();

		res.json(category);
	} catch (err) {
		// console.log(err);
		res.status(400).json({
			error: 'Create category failed.',
		});
	}
}
async function list(req, res) {
	const categories = await Category.find({}).sort({ createdAt: -1 }).exec();

	res.json(categories);
}
async function read(req, res) {
	const category = await Category.findOne({ slug: req.params.slug }).exec();
	res.json(category);
}

async function update(req, res) {
	const { name } = req.body;
	const { slug } = req.params;
	try {
		const update = await Category.findOneAndUpdate(
			{ slug },
			{
				name,
				slug: slugify(name),
			},
			{ new: true }
		);

		res.json(update);
	} catch (error) {
		res.status(400).send('Category update failed.');
	}
}

async function remove(req, res) {
	const { slug } = req.params;

	try {
		const deleted = await Category.findOneAndDelete({ slug });
		// console.log('DELETED', deleted);
		res.json(deleted);
		// res.json({ok: true});
	} catch (err) {
		console.log('remove', err);
		res.status(400).send('Category delete failed.');
	}
}

module.exports = {
	create,
	list,
	read,
	update,
	remove,
};
