import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	Location,
	useLocation,
	useParams,
	useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import jwtDecode from 'jwt-decode';

import type { ShortlinkFormData } from '../types';
import {
	createShortlink,
	patchShortlink,
	getShortlink,
} from '../slices/shortlinkSlice';
import type { AppDispatch, RootState } from '../store';

import styles from '../styleClasses';

// =============================================================================================================
// Component
// =============================================================================================================

const CreateShortlink = () => {
	const [formData, setFormData]: [
		ShortlinkFormData,
		React.Dispatch<React.SetStateAction<ShortlinkFormData>>
	] = useState((): ShortlinkFormData => {
		return {
			title: '',
			description: '',
			target: '',
			shortlink: '',
		};
	});

	const location: Location = useLocation();

	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const isEdit: boolean = location.pathname.includes('/edit') ? true : false;

	const { shortlinkId } = useParams();

	const alertMessage: any = useSelector((state: RootState) => {
		return state.shortlinks.alertMessage;
	});

	useEffect(() => {
		dispatch(getShortlink({ shortlinkId }));
	}, [dispatch, shortlinkId]);

	const currentShortlink: any = useSelector(
		(state: RootState) => state.shortlinks.currentShortlink
	);

	// populate input fields with existing data
	useEffect(() => {
		if (isEdit) {
			setFormData((): ShortlinkFormData => {
				return {
					title: currentShortlink.title,
					description: currentShortlink.description,
					target: currentShortlink.target,
					shortlink: currentShortlink.shortlink,
				};
			});
		}
	}, [isEdit, currentShortlink]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isEdit) {
			dispatch(patchShortlink({ formData, shortlinkId, navigate }));
		} else {
			dispatch(createShortlink({ formData, navigate }));
		}
		// don't navigate immediatly after create/edit - to check if shortlink already in use and display alert message
		// navigate(-1);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// -------------------------------------------------------------------------------------------------------------

	return (
		<>
			<div className='md:w-1/2 lg:w-1/3 w-5/6 mx-auto border border-grey rounded-lg mt-32'>
				<form onSubmit={handleSubmit} className='w-full mx-auto p-5'>
					{alertMessage && (
						<div className='mb-5 bg-orange-300 w-5/6 font-bold mx-auto text-center	rounded-md text-xl font-fira'>
							{alertMessage}
						</div>
					)}

					<h1 className='text-3xl font-black text-center'>
						{isEdit ? 'Edit' : 'Create'}
					</h1>

					<div className='mt-5'>
						<label htmlFor='title' className={styles.label}>
							Title
						</label>
						<input
							type='text'
							name='title'
							id='title'
							value={formData.title}
							onChange={handleChange}
							className={styles.input}
							placeholder='Eg. My youtube channel'
							required
						/>
					</div>

					<div className='mt-5'>
						<label htmlFor='description' className={styles.label}>
							Description
						</label>
						<input
							type='text'
							name='description'
							id='description'
							value={formData.description}
							onChange={handleChange}
							className={styles.input}
							placeholder='Eg. Channel on how code works'
						/>
					</div>

					<div className='mt-5'>
						<label htmlFor='target' className={styles.label}>
							Target
						</label>
						<input
							type='text'
							name='target'
							id='target'
							value={formData.target}
							onChange={handleChange}
							className={styles.input}
							placeholder='Eg. youtube.com/yourchannelname'
							required
						/>
					</div>

					<div className='mt-5'>
						<label htmlFor='shortlink' className={styles.label}>
							Shortlink{' '}
							<span className='text-xs font-bold'>(omit to generate)</span>
						</label>
						<input
							type='text'
							name='shortlink'
							id='shortlink'
							value={formData.shortlink}
							onChange={handleChange}
							className={styles.input}
							placeholder='hcw-091'
						/>
					</div>

					<button type='submit' className={styles.button}>
						{!isEdit ? 'Create' : 'Edit'}
					</button>
				</form>
			</div>
		</>
	);
};

// =============================================================================================================
// Export
// =============================================================================================================
export default CreateShortlink;
