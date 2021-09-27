const SubCategory = require('../models/subCategory.model');
const slugify = require('slugify');

async function create(req, res) {
	try {
		const { name, parent } = req.body;
		// console.log('PARENT', parent);
		const subCategory = await new SubCategory({
			name,
			parent,
			slug: slugify(name).toLowerCase(),
		}).save();

		res.json(subCategory);
	} catch (err) {
		// console.log(err);
		res.status(400).json({
			error: 'Create SubCategory failed.',
		});
	}
}
async function list(req, res) {
	const subCategories = await SubCategory.find({})
		.sort({ createdAt: -1 })
		.exec();

	res.json(subCategories);
}

async function read(req, res) {
	const subCategory = await SubCategory.findOne({
		slug: req.params.slug,
	}).exec();
	res.json(subCategory);
}

async function update(req, res) {
	const { name, parent } = req.body;
	const { slug } = req.params;

	try {
		const update = await SubCategory.findOneAndUpdate(
			{ slug },
			{
				name,
				parent,
				slug: slugify(name),
			},
			{ new: true }
		);

		res.json(update);
	} catch (error) {
		console.log('update sub error', error);
		res.status(400).send('subCategory update failed.');
	}
}

async function remove(req, res) {
	const { slug } = req.params;

	try {
		const deleted = await SubCategory.findOneAndDelete({ slug });
		// console.log('DELETED', deleted);
		res.json(deleted);
		// res.json({ok: true});
	} catch (err) {
		console.log('remove', err);
		res.status(400).send('SubCategory delete failed.');
	}
}

module.exports = {
	create,
	list,
	read,
	update,
	remove,
};
