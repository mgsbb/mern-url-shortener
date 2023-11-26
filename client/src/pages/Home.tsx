import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { Card } from '../components';
import {
	getAllShortlinks,
	getAllShortlinksWithFilters,
} from '../slices/shortlinkSlice';
import { clearUserAlertMessage } from '../slices/userSlice';
import type { RootState, AppDispatch } from '../store';

const Home = () => {
	const allShortlinks = useSelector(
		(state: RootState) => state.shortlinks.allShortlinks
	);

	const dispatch = useDispatch<AppDispatch>();

	const [toggleFilters, setToggleFilters]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	] = useState(false);

	const [sort, setSort] = useState('latest');

	const [search, setSearch] = useState('');

	const [page, setPage] = useState('');

	const token = JSON.parse(localStorage.getItem('profile') || '')?.token;
	const decodedToken: any = jwtDecode(token);

	useEffect(() => {
		dispatch(clearUserAlertMessage());
		// dispatch(getAllShortlinks());
		dispatch(getAllShortlinksWithFilters({ page, search, sort }));
	}, [dispatch]);

	return (
		<>
			<div className='mt-[13vh] w-5/6 mx-auto'>
				{/* Button */}
				<div className='mx-auto sm:w-1/3 md:w-1/4'>
					{/* Create button */}
					<Link to={'create'}>
						<button className='rounded-md h-[2.2rem] w-full bg-green-700 text-white font-semibold'>
							Create
						</button>
					</Link>

					{/* Filter button */}
					<button
						onClick={() => setToggleFilters((prev) => !prev)}
						className='rounded-md h-[2.2rem] w-full bg-white text-green-700 font-semibold border-2 mt-2 border-green-700'
					>
						Filters
					</button>
				</div>

				{/* Filters */}
				{toggleFilters && (
					<div className='mx-auto mt-12 mb-12 sm:w-5/6 md:w-2/3 rounded-lg bg-green-100'>
						{/* <h1 className='text-2xl font-black mt-2 text-center'>Filters</h1> */}
						<form
							onSubmit={(e) => {
								e.preventDefault();
								// console.log(search, sort);
								dispatch(getAllShortlinksWithFilters({ page, search, sort }));
							}}
							className='w-full mx-auto p-5 flex flex-col justify-around md:items-end md:flex-row'
						>
							<div className='md:w-1/3'>
								<label
									htmlFor='search'
									className='block text-md font-fira font-semibold'
								>
									Search
								</label>
								<input
									type='text'
									name='search'
									id='search'
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className='border border-gray-400 rounded-md w-full h-[2.2rem]'
								/>
							</div>

							<div className='md:w-1/3'>
								<label
									htmlFor='sort'
									className='block text-md font-fira font-semibold'
								>
									Sort
								</label>
								<select
									value={sort}
									onChange={(e) => setSort(e.target.value)}
									name='sort'
									id='sort'
									className='border border-gray-400 rounded-md h-[2.2rem] w-full bg-white'
								>
									<option value='az'>A-Z</option>
									<option value='za'>Z-A</option>
									<option value='latest'>Latest</option>
									<option value='oldest'>Oldest</option>
								</select>
							</div>

							<button
								type='submit'
								className='rounded-md  bg-green-700 text-white font-semibold p-2 mt-5'
							>
								Apply
							</button>
						</form>
					</div>
				)}

				{/* Shortlinks */}
				<div className='mx-auto mt-12 mb-12 sm:w-5/6 md:w-2/3'>
					{allShortlinks.map((shortlink: any) => (
						<Card key={shortlink?._id} {...shortlink} />
					))}
				</div>

				{/* Pagination */}
			</div>

			{/* Demo user message */}
			{decodedToken?.isDemo && (
				<div className='flex justify-center'>
					<div className='fixed bottom-0 bg-black text-white w-full sm:w-2/3 text-center'>
						Demo User. All data will be deleted in 1h. Login to persist data.
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
