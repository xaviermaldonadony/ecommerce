import { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Register = ({ history }) => {
	const [email, setEmail] = useState('');
	const { user } = useSelector((state) => state);

	useEffect(() => {
		if (user && user.token) {
			history.push('/');
		}
	}, [user, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};

		// Checks if email addres taken
		const emailRes = await auth.fetchSignInMethodsForEmail(email);

		if (emailRes === 0) {
			//Create new user
			const res = await auth.sendSignInLinkToEmail(email, config);
			toast.success(
				`Email is sent to ${email}. Click the link to complete your registration.`
			);
			console.log('response', res);
			window.localStorage.setItem('emailForRegistration', email);
		} else {
			// User already exists
			toast.error('Email already taken.');
		}

		// Save user email in local storage
		// clear state
		setEmail('');
	};

	const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type='email'
				className='form-control p-1'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='Your email'
				autoFocus
			/>
			<button type='submit' className='btn btn-raised mt-2'>
				Register
			</button>
		</form>
	);

	return (
		<div>
			<div className='container p-5'>
				{/*	12 */}
				<div className='row'>
					<div className='col-md-y offset-md-3'>
						<h4>Register</h4>
						{registerForm()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
