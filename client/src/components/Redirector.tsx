import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Redirector = () => {
	const { shortlink } = useParams();

	React.useEffect(() => {
		async function getTarget() {
			const response: any = await axios.get(`/r/${shortlink}`);
			const target = response.data?.target;

			window.location.replace(target);
		}
		getTarget();
	}, []);
	return <></>;
};

export default Redirector;
