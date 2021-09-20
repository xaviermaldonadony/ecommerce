import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingToRedirect = () => {
	const [count, setCount] = useState(5);
	let history = useHistory();

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((currentCount) => --currentCount);
		}, 150);

		// redirect once count is equl to 0
		count === 0 && history.push('/');

		return () => clearInterval(interval);
	}, [count, history]);
	const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

	return (
		<div className='container p-5 text-center'>
			<Spin indicator={antIcon} />
		</div>
	);
};

export default LoadingToRedirect;
