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
	httpCreateSubCategory,
	httpRemoveSubCategory,
	httpGetSubCategories,
	httpUpdateSubCategory,
} from '../../../utils/subCategory';
import { httpGetCategories } from '../../../utils/category';

const SubCategoryCreate = () => {
	const { user } = useSelector((state) => state);
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [category, setCategory] = useState([]);

	const [keyword, setKeyword] = useState('');

	const loadCategories = useCallback(async () => {
		setLoading(true);
		const res = await httpGetCategories();
		// console.log(res);
		setLoading(false);
		setCategories(res.data);
	}, []);

	const loadSubCategories = useCallback(async () => {
		setLoading(true);
		const res = await httpGetSubCategories();
		// console.log(res);
		setLoading(false);
		setSubCategories(res.data);
	}, []);

	useEffect(() => {
		loadCategories();
		loadSubCategories();
	}, [loadCategories, loadSubCategories]);

	const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(name);
		setLoading(true);
		try {
			const res = await httpCreateSubCategory(
				{ name, parent: category },
				user.token
			);
			setLoading(false);
			setName('');
			toast.success(`"${res.data.name}" has been created`);
			await loadSubCategories();
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
			const res = await httpRemoveSubCategory(slug, user.token);
			toast.success(`"${res.data.name}" deleted`);
			setLoading(false);
			await loadSubCategories();
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
					<h4 className='txt-gray'>Create Sub Category</h4>
					<div className='form-group my-4'>
						<label className='mr-sm-2 txt-gray' for='inlineFormCustomSelect'>
							Select Category
						</label>
						<select
							className='custom-select mr-sm-2 '
							onChange={(e) => setCategory(e.target.value)}
						>
							<option>Choose...</option>
							{categories.length > 0 &&
								categories.map((c) => (
									<option className='txt-gray' key={c._id} value={c._id}>
										{c.name}
									</option>
								))}
						</select>
					</div>
					<CategoryForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
						placeholder={'Enter sub category name'}
					/>

					<LocalSearch setKeyword={setKeyword} keyword={keyword} />
					{loading && <Spin indicator={antIcon} className='col mx-auto' />}

					{subCategories.filter(searched(keyword)).map((sc) => (
						<div
							key={sc._id}
							className='alert alert-secondary bg-light txt-gray rounded'
						>
							{sc.name}
							<span
								onClick={() => handleRemove(sc.slug)}
								className='btn btn-sm float-right'
							>
								<DeleteOutlined className='text-danger' />
							</span>
							<Link to={`/admin/subcategory/${sc.slug}`}>
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

export default SubCategoryCreate;
