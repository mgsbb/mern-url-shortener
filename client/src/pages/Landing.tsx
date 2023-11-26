import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import landingPic from '../assets/landing_pic.svg';

const Landing = () => {
	const [token, setToken] = React.useState(localStorage.getItem('profile'));

	React.useEffect(() => {
		setToken(localStorage.getItem('profile'));
	}, []);

	if (token) {
		return <Navigate to='/' />;
	}

	return (
		<>
			<div className='flex flex-col-reverse justify-center items-center mt-24 sm:flex-row-reverse sm:mt-48'>
				{/* After small screen - width is 1/4, before sm - it is full */}
				<div className='sm:w-1/4'>
					<h1 className='text-xl text-center mt-10 font-black sm:text-6xl '>
						Shorten URL
					</h1>
					{/* <h1 className='text-6xl font-semibold'>Wide Reach.</h1> */}
					{/* Go button */}
					<Link to='/auth' className='text-white'>
						<button className='bg-green-700 rounded-lg mt-8 w-[10rem] h-12 '>
							Go
						</button>
					</Link>
				</div>

				{/* Landing pic */}
				{/* 1/4 after sm, 2/3 at sm */}
				<div className='sm:w-1/4 w-2/3'>
					<img src={landingPic} alt='' className='sm:w-3/4' />
				</div>
			</div>
		</>
	);
};

export default Landing;
