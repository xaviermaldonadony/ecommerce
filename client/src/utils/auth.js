import axios from 'axios';

const httpCreateOrUpdateUser = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/create-or-update-user`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};

const httpCurrentUser = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/current-user`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};

const httpCurrentAdmin = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/current-admin`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};

export { httpCreateOrUpdateUser, httpCurrentUser, httpCurrentAdmin };
