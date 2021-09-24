const LocalSearch = ({ keyword, setKeyword }) => {
	const handleSearchChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
	};
	return (
		<div className='input-group my-5'>
			<div className='input-group-prepend txt-gray bg-light px-4 mr-3 rounded'>
				<span className='input-group-text rounded-pill'>Search</span>
			</div>
			<input
				type='text'
				// placeholder='filter'
				value={keyword}
				onChange={handleSearchChange}
				className='form-control txt-gray'
			/>
		</div>
	);
};

export default LocalSearch;
