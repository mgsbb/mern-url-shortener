import React from 'react';
import { Link } from 'react-router-dom';

const NavListItems = ({ handleLogout }: any) => {
	return (
		<>
			<Link to={`profile`}>
				<i className='fa-regular fa-user fa-xl'></i>
			</Link>
			<button onClick={handleLogout}>
				<i className='fa-solid fa-arrow-right-from-bracket fa-xl'></i>
			</button>
		</>
	);
};

export default NavListItems;
