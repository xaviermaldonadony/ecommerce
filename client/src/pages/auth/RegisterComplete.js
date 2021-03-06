import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { auth } from '../../services/firebase';
import { httpCreateOrUpdateUser } from '../../utils/auth';

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const { user } = useSelector((state) => state);
	let dispatch = useDispatch();

	useEffect(() => {
		setEmail(window.localStorage.getItem('emailForRegistration'));
	}, []);

	const createOrUpdateUser = async (token) => {
		const resUser = await httpCreateOrUpdateUser(token);
		// console.log('CREAE ORUPDATE RES', resUser);

		dispatch({
			type: 'LOGGED_IN_USER',
			payload: {
				name: resUser.data.name,
				email: resUser.data.email,
				token,
				role: resUser.data.role,
				_id: resUser.data._id,
			},
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// validation
		if (!email || !password) {
			toast.error('Email and password is required.');
			return;
		}

		if (password.length < 6) {
			toast.error('Password must be at least 6 characters long.');
			return;
		}

		// Sign the user in, get user token and update users password and login
		try {
			const res = await auth.signInWithEmailLink(email, window.location.href);
			// console.log('RESULT', res);

			if (res.user.emailVerified) {
				// remove user email from local storage
				window.localStorage.removeItem('emailForRegistration');
				// get user id token
				let user = auth.currentUser;

				// console.log('user', user);
				await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();
				await createOrUpdateUser(idTokenResult.token);
				// console.log('-----------------------------');
				// console.log('user', user, 'idTokenResult', idTokenResult);
				// redux store

				// redirect
				history.push('/');
			}
		} catch (error) {
			console.log('error', error);
			// toast.error(error.message);
			toast.error(error.message);
		}
	};

	const completeRegistrationForm = () => (
		<form onSubmit={handleSubmit}>
			<input type='email' className='form-control p-2' value={email} disabled />
			<input
				type='password'
				className='form-control mt-2 p-2'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
				autoFocus
			/>

			<button type='submit' className='btn btn-raised mt-3'>
				Complete Registration
			</button>
		</form>
	);

	return (
		<div>
			<div className='container p-5'>
				{/*	12 */}
				<div className='row'>
					<div className='col-md-4 offset-md-3'>
						<h4>Register Complete</h4>
						{completeRegistrationForm()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
