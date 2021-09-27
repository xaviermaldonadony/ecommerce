import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import firebase from 'firebase';
import {
	HomeOutlined,
	SettingOutlined,
	UserAddOutlined,
	UserOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
const { SubMenu, Item } = Menu;

const Header = () => {
	const [current, setCurrent] = useState('home');
	let { user } = useSelector((state) => ({ ...state }));
	// let { user } = useSelector((state) => state);
	let dispatch = useDispatch();
	let history = useHistory();

	const handleClick = (e) => {
		// console.log(e.key);
		setCurrent(e.key);
	};

	const logout = () => {
		firebase.auth().signOut();
		dispatch({
			type: 'LOGOUT',
			payload: null,
		});

		history.push('/login');
	};

	return (
		<Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
			<Item key='home' icon={<HomeOutlined />} className='txt-gray'>
				<Link to='/'>Home</Link>
			</Item>

			{!user ? (
				<>
					<Item
						key='register'
						icon={<UserAddOutlined />}
						className='float-right ml-auto txt-gray'
					>
						<Link to='/register' className='txt-gray'>
							Register
						</Link>
					</Item>

					<Item
						className='txt-gray float-right'
						key='login'
						icon={<UserOutlined />}
					>
						<Link to='/login'>Login</Link>
					</Item>
				</>
			) : (
				<SubMenu
					key='SubMenu'
					icon={<SettingOutlined />}
					title={user.name}
					className='float-right ml-auto txt-gray'
				>
					{user?.role === 'subscriber' && (
						<Item key='userDashboard' className='txt-gray'>
							<Link to='/user/history'>Dashboard</Link>
						</Item>
					)}

					{user?.role === 'admin' && (
						<Item key='adminDashboard' className='txt-gray'>
							<Link to='/admin/dashboard'>Dashboard</Link>
						</Item>
					)}

					<Item
						key='logout'
						onClick={logout}
						icon={<LogoutOutlined />}
						className='txt-gray'
					>
						Logout
					</Item>
				</SubMenu>
			)}
		</Menu>
	);
};

export default Header;
