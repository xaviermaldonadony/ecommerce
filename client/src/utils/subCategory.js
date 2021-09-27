import axios from 'axios';

const httpGetSubCategories = async () =>
	await axios.get(`${process.env.REACT_APP_API}/subcategory`);

const httpGetSubCategory = async (slug) =>
	await axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`);

const httpRemoveSubCategory = async (slug, authtoken) =>
	await axios.delete(`${process.env.REACT_APP_API}/subcategory/${slug}`, {
		headers: {
			authtoken,
		},
	});

const httpUpdateSubCategory = async (slug, category, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/subcategory/${slug}`,
		category,
		{
			headers: {
				authtoken,
			},
		}
	);

const httpCreateSubCategory = async (category, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/subcategory`, category, {
		headers: {
			authtoken,
		},
	});

export {
	httpCreateSubCategory,
	httpGetSubCategories,
	httpGetSubCategory,
	httpRemoveSubCategory,
	httpUpdateSubCategory,
};
