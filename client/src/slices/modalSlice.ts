import { createSlice } from '@reduxjs/toolkit';

// =============================================================================================================
// Slice
// =============================================================================================================

const modalSlice = createSlice({
	name: 'modal',
	// non-serializable action: modalAction: () => {}, modalActionParams: {} when in initial state
	initialState: { isOpen: false, isConfirm: false },
	reducers: {
		openModal: (state) => {
			state.isOpen = true;
		},
		closeModal: (state) => {
			state.isOpen = false;
		},
		modalConfirm: (state) => {
			state.isConfirm = true;
		},
	},
});

// =============================================================================================================
// Exports
// =============================================================================================================

export const { openModal, closeModal, modalConfirm } = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;
