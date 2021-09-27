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
	httpUpdateSubCategory,
	httpGetSubCategory,
} from '../../../utils/subCategory';
import { httpGetCategories } from '../../../utils/category';

const SubCategoryUpdate = ({ history, match }) => {
	const { user } = useSelector((state) => state);
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [parent, setParent] = useState('');

	const loadCategories = useCallback(async () => {
		setLoading(true);
		const res = await httpGetCategories();
		// console.log(res);
		setLoading(false);
		setCategories(res.data);
	}, []);

	const loadSubCategory = useCallback(async () => {
		const { slug } = match.params;
		setLoading(true);

		const res = await httpGetSubCategory(slug);
		setLoading(false);
		setName(res.data.name);
		setParent(res.data.parent);
	}, [match.params]);

	useEffect(() => {
		loadCategories();
		loadSubCategory();
	}, [loadCategories, loadSubCategory]);

	const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { slug } = match.params;
		// console.log(name);
		setLoading(true);
		try {
			const res = await httpUpdateSubCategory(
				slug,
				{ name, parent },
				user.token
			);
			setLoading(false);
			toast.success(`"${res.data.name}" has been updated.`);
			setName('');
			// await loadSubCategories();
			history.push('/admin/subcategory');
		} catch (err) {
			setLoading(false);
			console.log(err);
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
					<h4 className='txt-gray'>Update Sub Category</h4>
					<div className='form-group my-4'>
						<label className='mr-sm-2 txt-gray'>Select Category</label>
						<select
							className='custom-select mr-sm-2 '
							onChange={(e) => setParent(e.target.value)}
						>
							<option>Choose...</option>
							{categories.length > 0 &&
								categories.map((c) => (
									<option
										className='txt-gray'
										key={c._id}
										value={c._id}
										selected={c._id === parent}
									>
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

					{loading && <Spin indicator={antIcon} className='col mx-auto' />}
				</div>
			</div>
		</div>
	);
};

export default SubCategoryUpdate;
