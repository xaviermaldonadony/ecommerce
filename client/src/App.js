import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';
import Header from './components/nav/Header';
import ForgotPassword from './pages/auth/ForgotPassword';
import History from './pages/user/History';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCategoryCreate from './pages/admin/subCategory/SubCategoryCreate';
import SubCategoryUpdate from './pages/admin/subCategory/SubCategoryUpdate';

import { httpCurrentUser } from './utils/auth';
import { auth } from './services/firebase';

const App = () => {
	const dispatch = useDispatch();

	// Check is user is logged in
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				try {
					const idTokenResult = await user.getIdTokenResult();
					const resUser = await httpCurrentUser(idTokenResult.token);
					// console.log('resUser', resUser);

					dispatch({
						type: 'LOGGED_IN_USER',
						payload: {
							name: resUser.data.name,
							email: resUser.data.email,
							token: idTokenResult.token,
							role: resUser.data.role,
							_id: resUser.data._id,
						},
					});
				} catch (err) {
					console.log(err);
				}
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	return (
		<>
			<Header />
			<ToastContainer />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/register/complete' component={RegisterComplete} />
				<Route exact path='/forgot/password' component={ForgotPassword} />
				<UserRoute exact path='/user/history' component={History} />
				<UserRoute exact path='/user/password' component={Password} />
				<UserRoute exact path='/user/whishlist' component={Wishlist} />
				<AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
				<AdminRoute exact path='/admin/category' component={CategoryCreate} />
				<AdminRoute
					exact
					path='/admin/category/:slug'
					component={CategoryUpdate}
				/>
				<AdminRoute
					exact
					path='/admin/subcategory'
					component={SubCategoryCreate}
				/>
				<AdminRoute
					exact
					path='/admin/subcategory/:slug'
					component={SubCategoryUpdate}
				/>
			</Switch>
		</>
	);
};
export default App;
