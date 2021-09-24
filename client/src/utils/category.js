import axios from 'axios';

const httpGetCategories = async () =>
	await axios.get(`${process.env.REACT_APP_API}/category`);

const httpGetCategory = async (slug) =>
	await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

const httpRemoveCategory = async (slug, authtoken) =>
	await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
		headers: {
			authtoken,
		},
	});

const httpUpdateCategory = async (slug, category, authtoken) =>
	await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
		headers: {
			authtoken,
		},
	});

const httpCreateCategory = async (category, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/category`, category, {
		headers: {
			authtoken,
		},
	});

export {
	httpCreateCategory,
	httpGetCategories,
	httpGetCategory,
	httpRemoveCategory,
	httpUpdateCategory,
};
