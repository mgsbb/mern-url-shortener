import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteUser,
	getUser,
	patchUser,
	logout,
	clearUserAlertMessage,
} from '../slices/userSlice';
import type { AppDispatch, RootState } from '../store';

import styles from '../styleClasses';
import { openModal } from '../slices/modalSlice';
import Modal from '../components/Modal';

const Profile = () => {
	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const currentUser: any = useSelector((state: RootState) => {
		return state.user.currentUser;
	});

	const alertMessage: any = useSelector((state: RootState) => {
		return state.user.alertMessage;
	});

	const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
	const isModalConfirm = useSelector(
		(state: RootState) => state.modal.isConfirm
	);

	const [formData, setFormData] = useState(() => {
		return {
			firstName: '',
			lastName: '',
			email: '',
			newPassword: '',
			currentPassword: '',
		};
	});

	const handleEdit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (currentUser.isDemo) {
			return;
		} else {
			dispatch(patchUser({ formData }));
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(() => {
			return { ...formData, [e.target.name]: e.target.value };
		});
	};

	const handleDelete = () => {
		if (currentUser.isDemo) {
			return;
		} else {
			// open the modal here
			dispatch(openModal());
		}
	};

	useEffect(() => {
		if (isModalConfirm) {
			dispatch(deleteUser());
			setTimeout(() => {
				dispatch(logout());
				dispatch(clearUserAlertMessage());
				navigate('/welcome');
			}, 3000);
		}
	}, [isModalConfirm]);

	return (
		<>
			<div className='w-5/6 mx-auto mt-[15vh] sm:w-[70%] lg:w-[40%]'>
				<div className='text-2xl font-bold flex items-center sm:text-3xl lg:text-5xl'>
					<i className='fa-regular fa-user fa-sm mr-6'></i>
					<div>
						<span>{currentUser.firstName} </span>
						<span>{currentUser.lastName}</span>
						<h6 className='text-base font-black'>{currentUser.email}</h6>
					</div>
				</div>

				<form
					onSubmit={handleEdit}
					className='mt-10 border rounded-xl p-3 sm:p-5'
				>
					<div className='w-11/12 sm:w-2/3 sm:ml-10'>
						{/* {alertMessage} */}
						{alertMessage && (
							<div className='mb-5 bg-orange-300 w-full font-bold mx-auto text-center	rounded-md text-xl font-fira'>
								{alertMessage}
							</div>
						)}

						<h1 className='font-bold text-2xl sm:text-3xl'>Update details</h1>

						{currentUser.isDemo ? (
							<div className='font-bold mt-3 text-red-600'>
								Demo user cannot be updated!
							</div>
						) : (
							<></>
						)}

						<div className='mt-3'>
							<label htmlFor='firstName' className={styles.label}>
								First Name
							</label>
							<input
								type='text'
								name='firstName'
								id='firstName'
								onChange={handleChange}
								className={styles.input}
							/>
						</div>

						<div className='mt-3'>
							<label htmlFor='lastName' className={styles.label}>
								Last Name
							</label>
							<input
								type='text'
								name='lastName'
								id='lastName'
								onChange={handleChange}
								className={styles.input}
							/>
						</div>

						<div className='mt-3'>
							<label htmlFor='email' className={styles.label}>
								Email
							</label>
							<input
								type='text'
								name='email'
								id='email'
								onChange={handleChange}
								className={styles.input}
							/>
						</div>
						<div className='mt-3'>
							<label htmlFor='newPassword' className={styles.label}>
								New password
							</label>
							<input
								type='password'
								name='newPassword'
								id='newPassword'
								onChange={handleChange}
								className={styles.input}
							/>
						</div>

						<h2 className='mt-5 font-black sm:text-xl sm:font-semibold'>
							Enter current password to update
						</h2>

						<div className='mt-3'>
							<label htmlFor='currentPassword' className={styles.label}>
								Current password
							</label>
							<input
								type='password'
								name='currentPassword'
								id='currentPassword'
								onChange={handleChange}
								className={styles.input}
							/>
						</div>

						<button type='submit' className={`${styles.button} mt-5`}>
							Update
						</button>
					</div>
				</form>

				<div className='mt-10 border p-3 sm:p-5 rounded-xl mb-10'>
					<div className='w-11/12 sm:w-2/3 sm:ml-10'>
						<h1 className='text-2xl sm:text-3xl font-bold'>Delete user</h1>

						{currentUser.isDemo && (
							<div className='font-bold mt-3 text-red-600'>
								Demo user cannot be deleted !
							</div>
						)}

						<button
							onClick={handleDelete}
							className={`${styles.button} mt-5 bg-red-600`}
						>
							Delete
						</button>
					</div>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && <Modal message='Are you sure you want to delete?' />}
		</>
	);
};

export default Profile;
