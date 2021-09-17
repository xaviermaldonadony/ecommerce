import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth, googleAuthProvider } from '../../config/firebase';
import { toast } from 'react-toastify';
import { Button, Spin } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';

const Login = ({ history }) => {
	const [email, setEmail] = useState('xaviermaldonadony@hotmail.com');
	const [password, setPassword] = useState('test123456');
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => state);
	let dispatch = useDispatch();

	useEffect(() => {
		if (user && user.token) {
			history.push('/');
		}
	}, [user, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		// console.table(email, password);
		try {
			const res = await auth.signInWithEmailAndPassword(email, password);
			// console.log(res);
			const { user } = res;
			const idTokenResult = await user.getIdTokenResult();

			dispatch({
				type: 'LOGGED_IN_USER',
				payload: {
					email: user.email,
					token: idTokenResult.token,
				},
			});

			history.push('/');
		} catch (error) {
			console.log('err', error.message);
			toast.error(error.message);
			setLoading(false);
		}
	};

	const googleLogin = async () => {
		setLoading(true);
		try {
			const res = await auth.signInWithPopup(googleAuthProvider);
			const { user } = res;
			const idTokenResult = await user.getIdTokenResult();
			// console.log('user', user);
			// console.log('idTokenResult', idTokenResult);

			dispatch({
				type: 'LOGGED_IN_USER',
				payload: {
					email: user.email,
					token: idTokenResult.token,
				},
			});

			history.push('/');
		} catch (error) {
			// console.log('err', error.message);
			toast.error(error.message);
			setLoading(false);
		}
	};

	const loginForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<input
					type='email'
					className='form-control p-1'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Your email'
					autoFocus
				/>
			</div>

			<div className='form-group'>
				<input
					type='password'
					className='form-control p-1 '
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
				/>
			</div>
			<Button
				onClick={handleSubmit}
				type='primary'
				className='mb-3'
				block
				shape='round'
				icon={<MailOutlined />}
				size='large'
				disabled={!email || password.length < 6}
			>
				Login with Email / Password
			</Button>
			<Button
				onClick={googleLogin}
				type='danger'
				className='mb-3'
				block
				shape='round'
				icon={<GoogleOutlined />}
				size='large'
				// disabled={!email || password.length < 6}
			>
				Login with Google
			</Button>
			<Link to='/forgot/password' className='float-right text-danger'>
				Forgot Password
			</Link>
		</form>
	);

	return (
		<div>
			<div className='container p-5'>
				<div className='row'>
					<div className='col-md-y offset-md-3'>
						{loading ? (
							<Spin size='large' className='d-flex justify-content-center' />
						) : (
							<h4>Login</h4>
						)}
						{loginForm()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
