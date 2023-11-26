import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import type { ShortlinkFormData } from '../types';

// =============================================================================================================
// Thunks
// =============================================================================================================

export const createShortlink = createAsyncThunk(
	'shortlink/createShortlink',
	async (arg: { formData: ShortlinkFormData; navigate: any }, thunkAPI) => {
		try {
			const response: any = await api.createShortlink(arg.formData);
			arg.navigate(-1);
			return response.data;
		} catch (error: any) {
			// console.log(error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
// =============================================================================================================

export const getShortlink = createAsyncThunk(
	'shortlink/getShortlink',
	async (arg: { shortlinkId: any }) => {
		try {
			const response: any = await api.getShortlink(arg.shortlinkId);
			return response.data;
		} catch (error) {
			// console.log(error);
		}
	}
);
// =============================================================================================================

export const patchShortlink = createAsyncThunk(
	'shortlink/patchShortlink',
	async (
		arg: {
			formData: ShortlinkFormData;
			shortlinkId: string | undefined;
			navigate: any;
		},
		thunkAPI
	) => {
		try {
			const response: any = await api.patchShortlink(
				arg.formData,
				arg.shortlinkId
			);
			arg.navigate(-1);
			return response.data;
		} catch (error: any) {
			// console.log(error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
// =============================================================================================================

export const deleteShortlink = createAsyncThunk(
	'shortlink/deleteShortlink',
	async (arg: { shortlinkId: string }) => {
		try {
			const response: any = api.deleteShortlink(arg.shortlinkId);
			return response.data;
		} catch (error) {
			// console.log(error);
		}
	}
);
// =============================================================================================================

export const getAllShortlinks = createAsyncThunk(
	'shortlink/getAllShortlinks',
	async () => {
		try {
			const response: any = await api.getAllShortlinks();
			return response.data;
		} catch (error) {
			// console.log(error);
		}
	}
);

// =============================================================================================================

export const getAllShortlinksWithFilters = createAsyncThunk(
	'shortlink/getAllShortlinksWithFilters',
	async (arg: { page: any; search: any; sort: any }) => {
		try {
			const response: any = await api.getAllShortlinksWithFilters(
				arg.page,
				arg.search,
				arg.sort
			);

			return response.data;
		} catch (error) {
			// console.log(error);
		}
	}
);

// =============================================================================================================
// Slice
// =============================================================================================================

const shortlinkSlice = createSlice({
	name: 'shortlink',
	initialState: {
		allShortlinks: [],
		currentShortlink: '',
		alertMessage: '',
	},
	reducers: {},
	extraReducers: (build) => {
		build
			.addCase(createShortlink.pending, (state, action) => {
				state.alertMessage = 'Creating...';
			})
			.addCase(createShortlink.fulfilled, (state, action) => {
				state.currentShortlink = action.payload.newShortlink;
				state.alertMessage = '';
			})
			.addCase(createShortlink.rejected, (state, action: any) => {
				state.alertMessage = action.payload?.message;
			})
			.addCase(getShortlink.pending, (state, action) => {})
			.addCase(getShortlink.fulfilled, (state, action) => {
				state.currentShortlink = action.payload.shortlink;
			})
			.addCase(getShortlink.rejected, (state, action) => {})
			.addCase(patchShortlink.pending, (state, action) => {
				state.alertMessage = 'Updating...';
			})
			.addCase(patchShortlink.fulfilled, (state, action) => {
				state.alertMessage = '';
			})
			.addCase(patchShortlink.rejected, (state, action: any) => {
				state.alertMessage = action.payload?.message;
			})
			.addCase(deleteShortlink.pending, (state, action) => {})
			.addCase(deleteShortlink.fulfilled, (state, action) => {})
			.addCase(deleteShortlink.rejected, (state, action) => {})
			.addCase(getAllShortlinks.pending, (state, action) => {})
			.addCase(getAllShortlinks.fulfilled, (state, action) => {
				state.allShortlinks = action.payload.allShortlinks;
			})
			.addCase(getAllShortlinks.rejected, (state, action) => {})
			.addCase(getAllShortlinksWithFilters.pending, (state, action) => {})
			.addCase(getAllShortlinksWithFilters.fulfilled, (state, action) => {
				state.allShortlinks = action.payload.finalResult;
			})
			.addCase(getAllShortlinksWithFilters.rejected, (state, action) => {});
	},
});

// =============================================================================================================
// Exports
// =============================================================================================================

const shortlinkReducer = shortlinkSlice.reducer;
export default shortlinkReducer;
