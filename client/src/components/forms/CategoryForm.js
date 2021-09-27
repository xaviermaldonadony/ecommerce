const CategoryForm = ({ name, handleSubmit, setName, placeholder }) => (
	<form onSubmit={handleSubmit}>
		<div className='form-group'>
			<label className='mt-2 txt-gray'>Name</label>
			<input
				type='text'
				className='form-control txt-gray-light'
				onChange={(e) => setName(e.target.value)}
				value={name}
				autoFocus
				required
				placeholder={placeholder ? `${placeholder}` : ''}
			/>
			<button className='btn btn-outline-primary mt-3'>Save</button>
		</div>
	</form>
);

export default CategoryForm;
