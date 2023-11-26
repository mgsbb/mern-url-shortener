import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import {
	createUser,
	login,
	loginDemo,
	clearUserAlertMessage,
} from '../slices/userSlice';
import { openModal } from '../slices/modalSlice';
import type { AppDispatch, RootState } from '../store';
import type { AuthFormData } from '../types';

const Auth = () => {
	const [token, setToken] = useState(localStorage.getItem('profile'));

	React.useEffect(() => {
		setToken(localStorage.getItem('profile'));
	}, []);

	const [formData, setFormData]: [
		AuthFormData,
		React.Dispatch<React.SetStateAction<AuthFormData>>
	] = useState((): AuthFormData => {
		return {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
	});

	const [isLogin, setIsLogin]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	] = useState(true);

	const alertMessage = useSelector(
		(state: RootState) => state.user.alertMessage
	);

	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isLogin) {
			dispatch(createUser({ formData, navigate }));
		} else {
			dispatch(login({ formData, navigate }));
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleDemo = () => {
		dispatch(loginDemo({ navigate }));
	};

	if (token) {
		return <Navigate to='/' />;
	}

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
						{isLogin ? 'Login' : 'Register'}
					</h1>

					<button
						type='button'
						onClick={() => {
							setIsLogin((prev) => !prev);
						}}
						className='font-semibold text-center w-full'
					>
						{isLogin ? 'New user? ' : 'Existing user? '}
						<span className='text-green-400 font-bold text-2xl'>
							{isLogin ? 'Register' : 'Login'}
						</span>
					</button>

					{!isLogin && (
						<>
							<div className='mt-5'>
								<label
									htmlFor='firstName'
									className='block text-md font-fira font-semibold'
								>
									First Name
								</label>
								<input
									required
									type='text'
									name='firstName'
									id='firstName'
									onChange={handleChange}
									className='border border-gray-400 rounded-md h-[2.2rem] w-full'
								/>
							</div>
							<div className='mt-5'>
								<label
									htmlFor='lastName'
									className='block text-md font-fira font-semibold'
								>
									Last Name
								</label>
								<input
									required
									type='text'
									name='lastName'
									id='lastName'
									onChange={handleChange}
									className='border border-gray-400 rounded-md h-[2.2rem] w-full'
								/>
							</div>
						</>
					)}
					<div className='mt-5'>
						<label
							htmlFor='email'
							className='block text-md font-fira font-semibold'
						>
							Email
						</label>
						<input
							required
							type='email'
							name='email'
							id='email'
							onChange={handleChange}
							className='border border-gray-400 rounded-md h-[2.2rem] w-full'
						/>
					</div>
					<div className='mt-5'>
						<label
							htmlFor='password'
							className='block text-md font-fira font-semibold'
						>
							Password
						</label>
						<input
							required
							type='password'
							name='password'
							id='password'
							onChange={handleChange}
							className='border border-gray-400 rounded-md h-[2.2rem] w-full'
						/>
					</div>
					{!isLogin && (
						<div className='mt-5'>
							<label
								htmlFor='confirmPassword'
								className='block text-md font-fira font-semibold'
							>
								Confirm Password
							</label>
							<input
								required
								type='password'
								name='confirmPassword'
								id='confirmPassword'
								onChange={handleChange}
								className='border border-gray-400 rounded-md h-[2.2rem] w-full'
							/>
						</div>
					)}
					<button
						type='submit'
						className='rounded-md h-[2.2rem] w-full mt-12 bg-green-700 text-white font-semibold'
					>
						{isLogin ? 'Login' : 'Register'}
					</button>

					<button
						type='button'
						onClick={handleDemo}
						className='rounded-md h-[2.2rem] w-full mt-5 text-green-700 font-semibold border border-green-700'
					>
						Demo
					</button>
				</form>
			</div>
		</>
	);
};

// const InputGroup = () => {};

export default Auth;
