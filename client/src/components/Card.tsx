import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
	_id,
	title,
	description,
	target,
	shortlink,
	createdAt,
}: any) => {
	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(
			`${window.location.host}/r/${shortlink}`
		);
	};

	return (
		<>
			<div className='border hover:border-2 hover:border-green-400 rounded-lg mt-8 p-5'>
				<Link to={`/shortlinks/${_id}`}>
					<div className='sm:flex sm:justify-between'>
						{/* Title */}
						<h1 className='text-2xl font-black overflow-hidden'>{title}</h1>
						{/* Time */}
						<span className='text-xs'>{createdAt.split('T')[0]}</span>
					</div>
					<p className='mt-1 overflow-hidden'>{description}</p>
				</Link>

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
					<span className='font-bold hidden sm:inline'>{'->'}</span>
					<span className='font-fira'> {target}</span>
				</div>

				<div className='text-xs'></div>
			</div>
		</>
	);
};

export default Card;
