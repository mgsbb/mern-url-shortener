import React from 'react';
// import errorImg from '../assets/error_page.svg';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<div
			style={{ background: 'url(../assets/error_page.svg)' }}
			className='w-full h-[100vh] p-10 pt-20'
		>
			<div>
				<div className='w-full md:w-1/4 mx-auto flex justify-center'>
					<Link to='/' className='w-1/2 bg-black text-white h-[7vh] rounded-lg'>
						<button className='h-[7vh] text-center w-full'>Back Home</button>
					</Link>
				</div>

				<div className='flex justify-center'>
					<div className='font-fira text-[8rem] sm:text-[16rem]'>404</div>
				</div>

				<div className='w-full sm:w-1/4 mx-auto flex justify-center'>
					<h1 className='text-lg sm:text-2xl font-black'>Resouce not found</h1>
				</div>
			</div>
		</div>
	);
};

export default Error;
