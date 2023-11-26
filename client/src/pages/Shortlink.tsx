import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { deleteShortlink, getShortlink } from '../slices/shortlinkSlice';
import { openModal } from '../slices/modalSlice';
import Modal from '../components/Modal';

const Shortlink = () => {
	const { shortlinkId }: any = useParams();

	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getShortlink({ shortlinkId }));
	}, [dispatch, shortlinkId]);

	const {
		title,
		description,
		target,
		shortlink,
		createdAt,
		updatedAt,
		timesVisited,
	}: any = useSelector((state: RootState) => state.shortlinks.currentShortlink);

	const alert = useSelector(
		(state: RootState) => state.shortlinks.alertMessage
	);

	const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
	const isConfirmModal = useSelector(
		(state: RootState) => state.modal.isConfirm
	);

	const date = createdAt?.split('T')[0];
	const time = createdAt?.split('T')[1].split('.')[0];
	const updatedDate = updatedAt?.split('T')[0];
	const updatedTime = updatedAt?.split('T')[1].split('.')[0];

	const handleDelete = () => {
		// don't dispatch here
		// dispatch(deleteShortlink({ shortlinkId }));
		// navigate('/');

		// open the modal and listen to confirmation by user using the follwing useEffect
		dispatch(openModal());
	};

	useEffect(() => {
		if (isConfirmModal) {
			dispatch(deleteShortlink({ shortlinkId }));
			navigate('/');
		}
	}, [isConfirmModal]);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(
			`${window.location.host}/r/${shortlink}`
		);
	};

	return (
		<>
			{/* Shortlink Page */}
			<div className='w-5/6 md:w-2/3 lg:w-[50%] mx-auto mt-[15vh] border p-5 rounded-lg'>
				{/* <h1>{alert}</h1> */}

				<div className='flex justify-between'>
					<div className='flex'>
						{/* Edit button */}
						<button className='mr-5'>
							<Link to={`/edit/${shortlinkId}`}>
								<i className='fa-regular fa-pen-to-square fa-2xl'></i>
							</Link>
						</button>
						{/* Title */}
						<h1 className='md:text-3xl lg:text-5xl text-2xl font-bold inline overflow'>
							{title}
						</h1>
					</div>
					{/* Back btn */}
					<button onClick={() => navigate(-1)}>
						<i className='fa-solid fa-left-long fa-2xl'></i>
					</button>
				</div>

				{/* Description */}
				<p className='mt-5 font-semibold'>{description}</p>

				<div className='mt-6'>
					<span onClick={copyToClipboard}>
						<Link to=''>
							<i className='fa-regular fa-copy fa-xl mr-3'></i>
						</Link>
					</span>
					<span className='font-fira text-xl sm:text-3xl font-semibold'>
						<a
							href={`http://${window.location.host}/r/${shortlink}`}
							target='_blank'
						>
							{`${window.location.host}/r/${shortlink}`}{' '}
						</a>
					</span>
					<span className='font-bold'>{'->'}</span>
					<span className='font-fira font-semibold'> {target}</span>
				</div>

				<div className='mt-5 text-sm font-semibold'>
					<i className='fa-solid fa-calendar mr-2'></i>
					{`${date} ${time}`}
				</div>

				{/* {createdAt !== updatedAt ? (
					<div className='mt-5 text-sm font-semibold'>
						<i className='fa-solid fa-file-pen mr-2'></i>
						{`${updatedDate} ${updatedTime}`}
					</div>
				) : (
					''
				)} */}

				<div className='mt-5 text-sm font-semibold'>
					Times visited: {timesVisited}
				</div>

				<button
					onClick={handleDelete}
					className='rounded-md h-[2.2rem] w-full md:w-1/2 lg:w-1/3 mt-12 bg-red-600 text-white font-semibold'
				>
					Delete
				</button>
			</div>

			{/* Modal */}
			{isModalOpen && <Modal message='Are you sure you want to delete?' />}
		</>
	);
};

export default Shortlink;
