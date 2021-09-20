import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

import { httpCurrentAdmin } from '../../utils/auth';

const AdminRoute = ({ children, ...rest }) => {
	const user = useSelector((state) => state.user);
	const [ok, setOk] = useState(false);

	useEffect(() => {
		const fetchCurrentAdmin = async () => {
			// console.log(user.token);
			if (user && user.token) {
				try {
					await httpCurrentAdmin(user.token);
					setOk(true);
				} catch (err) {
					console.log(err);
				}
			}
		};

		fetchCurrentAdmin();
	}, [user]);

	return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
