import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
	httpCreateCategory,
	httpRemoveCategory,
	httpGetCategories,
} from '../../../utils/category';

const CategoryCreate = () => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => state);
	const [categories, setCategories] = useState([]);

	const [keyword, setKeyword] = useState('');

	const loadCategories = useCallback(async () => {
		setLoading(true);
		const res = await httpGetCategories();
		// console.log(res);
		setLoading(false);
		setCategories(res.data);
	}, []);

	useEffect(() => {
		loadCategories();
	}, [loadCategories]);

	const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(name);
		setLoading(true);
		try {
			const res = await httpCreateCategory({ name }, user.token);
			setLoading(false);
			setName('');
			toast.success(`"${res.data.name}" has been created`);
			await loadCategories();
		} catch (err) {
			setLoading(false);
			console.log(err);
			if (err.response.status === 400) {
				toast.error(err.response.data.error);
			}
		}
	};

	const handleRemove = async (slug) => {
		console.log(slug);
		if (!window.confirm('Are you sure you want to delete')) {
			return;
		}

		setLoading(true);

		try {
			const res = await httpRemoveCategory(slug, user.token);
			toast.success(`"${res.data.name}" deleted`);
			setLoading(false);
			await loadCategories();
		} catch (err) {
			setLoading(false);
			if (err.response.data.status === 400) {
				toast.error(err.response.data);
			}
		}
	};

	//
	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col mt-5'>
					<h4 className='txt-gray'>Create category</h4>
					<CategoryForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>

					<LocalSearch setKeyword={setKeyword} keyword={keyword} />
					{loading && <Spin indicator={antIcon} className='col mx-auto' />}

					{categories.filter(searched(keyword)).map((category) => (
						<div
							key={category._id}
							className='alert alert-secondary bg-light txt-gray rounded'
						>
							{category.name}
							<span
								onClick={() => handleRemove(category.slug)}
								className='btn btn-sm float-right'
							>
								<DeleteOutlined className='text-danger' />
							</span>
							<Link to={`/admin/category/${category.slug}`}>
								<span className='btn btn-sm float-right'>
									<EditOutlined className='text-primary' />
								</span>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoryCreate;
