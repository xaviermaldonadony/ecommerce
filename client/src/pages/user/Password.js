import { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { Spin } from 'antd';
import { auth } from '../../services/firebase';
import { toast } from 'react-toastify';

const Pssword = () => {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password.length < 6) {
			toast.error('Password needs to be 6 or more characters long');
			return;
		}
		setLoading(true);
		console.log(password);
		try {
			await auth.currentUser.updatePassword(password);

			setLoading(false);
			setPassword('');
			toast.success('Password updated');
		} catch (error) {
			setLoading(false);
			console.log(error.message);
			toast.error(error.message);
		}
	};

	const passwordUpdateForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label>Your Password</label>
				<input
					type='password'
					onChange={(e) => setPassword(e.target.value)}
					className='form-control'
					placeholder='Enter new password'
					disabled={loading}
					value={password}
				/>

				<button className='btn btn-primary' disabled={!password || loading}>
					Submit
				</button>
			</div>
		</form>
	);

	return (
		<div className='container-fluid '>
			<div className='row'>
				<div className='col-md-4 col-sm-3'>
					<UserNav />
				</div>
				<div className='col-md-auto col-sm-3 p-5 p-sm-0'>
					{loading ? (
						<Spin size='large' className='d-flex justify-content-center' />
					) : (
						<h5>Password Update</h5>
					)}
					{passwordUpdateForm()}
				</div>
			</div>
		</div>
	);
};

export default Pssword;
