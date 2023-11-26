import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
	const [token, setToken] = useState(localStorage.getItem('profile'));
	useEffect(() => {
		setToken(localStorage.getItem('profile'));
	}, []);

	if (!token || token === undefined) {
		return <Navigate to='/welcome' />;
	}
	return children;
};

export default ProtectedRoute;
