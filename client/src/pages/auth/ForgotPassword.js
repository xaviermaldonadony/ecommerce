import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { auth, googleAuthProvider } from '../../config/firebase';
import { toast } from 'react-toastify';

const ForgotPassword = ({ history }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => state);

	useEffect(() => {
		if (user && user.token) {
			history.push('/');
		}
	}, [user, history]);

	const hanldeSumbit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const config = {
			url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
			handleCodeInApp: true,
		};

		try {
			const res = await auth.sendPasswordResetEmail(email, config);
			console.log(res);
			setEmail('');
			setLoading(false);
			toast.success('Check your email for password reset link.');
		} catch (error) {
			setLoading(false);
			console.log(error.message);
			toast.error(error.message);
		}
	};

	return (
		// <div className='container col-md-6 offset-md-3 p-5'>
		<div className='container col-md-4 mx-auto mt-4 p-5'>
			{loading ? (
				<Spin size='large' className='d-flex justify-content-center' />
			) : (
				<h6>Forgot Password</h6>
			)}
			<form onSubmit={hanldeSumbit} className='mt-4'>
				<input
					type='email'
					className='form-control -'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button className='btn btn-raised mt-4' disabled={!email}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
