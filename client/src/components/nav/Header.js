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
			<Item key='home' icon={<HomeOutlined />}>
				<Link to='/'>Home</Link>
			</Item>

			{!user ? (
				<>
					<Item
						key='register'
						icon={<UserAddOutlined />}
						className='float-right ml-auto'
					>
						<Link to='/register'>Register</Link>
					</Item>

					<Item className='float-right' key='login' icon={<UserOutlined />}>
						<Link to='/login'>Login</Link>
					</Item>
				</>
			) : (
				<SubMenu
					key='SubMenu'
					icon={<SettingOutlined />}
					title={user.name}
					className='float-right ml-auto'
				>
					<Item key='setting:1'>Option 1</Item>
					<Item key='setting:2'>Option 2</Item>
					<Item key='logout' onClick={logout} icon={<LogoutOutlined />}>
						Logout
					</Item>
				</SubMenu>
			)}
		</Menu>
	);
};

export default Header;
