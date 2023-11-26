import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

import { closeModal, modalConfirm } from '../slices/modalSlice';

const Modal = ({ message }: any) => {
	const element: any = document.getElementById('modal');

	const dispatch = useDispatch();

	return ReactDOM.createPortal(
		<>
			{/* Overlay */}
			<div className='fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70'></div>

			<div className='flex justify-center'>
				<div className='fixed h-[50vh] md:h-[35vh] bg-white rounded-lg w-5/6 md:w-1/2 lg:w-1/3 top-[20vh] p-5'>
					<div className='flex h-full flex-col justify-evenly'>
						{/* Modal message */}
						<h1 className='text-3xl font-bold text-center'>{message}</h1>

						{/* Buttons */}
						<div className='flex h-1/3 flex-col sm:flex-row justify-evenly items-center'>
							<button
								onClick={() => {
									dispatch(modalConfirm());
									dispatch(closeModal());
								}}
								className='bg-green-500 w-5/6 mx-auto sm:w-1/3 rounded-lg h-[2.2rem] text-white font-bold'
							>
								Confirm
							</button>
							<button
								onClick={() => dispatch(closeModal())}
								className='bg-red-500 w-5/6 mx-auto sm:w-1/3 rounded-lg h-[2.2rem] text-white font-bold'
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>,
		element
	);
};

export default Modal;
