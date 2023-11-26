import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';
import type { AppDispatch } from '../store';
import logoImg from '../assets/logo.png';
import NavListItems from './NavListItems';

const Navbar = () => {
	const token = localStorage.getItem('profile');

	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/welcome');
	};

	return (
		<>
			<div className='fixed top-0 left-0 w-full bg-black text-green-400 '>
				<div className='flex justify-between items-center h-[10vh] w-3/4 mx-auto'>
					<Link to='/'>
						<img src={logoImg} alt='' className='h-[10vh]' />
					</Link>

					{token && (
						<>
							<div className='hidden sm:w-[20%] sm:flex sm:justify-between lg:w-[15%]'>
								<NavListItems handleLogout={handleLogout} />
							</div>
							<div className='block sm:hidden'>
								<i
									className='fa-solid fa-bars text-2xl cursor-pointer'
									onClick={() => setIsMenuOpen((prev) => !prev)}
								></i>
							</div>
						</>
					)}
				</div>

				{isMenuOpen && (
					<div className='border-t border-grey h-[8vh] flex justify-around items-center sm:hidden'>
						<NavListItems handleLogout={handleLogout} />
					</div>
				)}
			</div>
		</>
	);
};

export default Navbar;
