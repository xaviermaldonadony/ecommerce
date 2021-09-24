import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';
import { httpUpdateCategory, httpGetCategory } from '../../../utils/category';

const CategoryUpdate = ({ history, match }) => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => state);

	useEffect(() => {
		const loadCategory = async () => {
			setLoading(true);
			const res = await httpGetCategory(match.params.slug);
			// console.log(res);
			setLoading(false);
			setName(res.data.name);
		};
		loadCategory();
	}, [match.params.slug]);

	const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(name);
		setLoading(true);
		try {
			const res = await httpUpdateCategory(
				match.params.slug,
				{ name },
				user.token
			);
			setLoading(false);
			setName('');
			toast.success(`"${res.data.name}" has been created`);
			history.push('/admin/category');
		} catch (err) {
			setLoading(false);
			console.log('ERROR', err);
			console.log('---------------------------------');
			if (err.response.status === 400) {
				toast.error(err.response.data.error);
			}
		}
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col mt-5'>
					<h4 className='txt-gray'>Update Category</h4>
					<CategoryForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>
					{loading && <Spin indicator={antIcon} className='col mx-auto' />}
					<hr />
				</div>
			</div>
		</div>
	);
};

export default CategoryUpdate;
