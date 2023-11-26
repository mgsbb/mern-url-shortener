import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

import type { AuthFormData } from '../types';

// =============================================================================================================
// Thunks
// =============================================================================================================
// register
export const createUser = createAsyncThunk(
	'user/createUser',
	async (arg: { formData: any; navigate: any }, thunkAPI) => {
		try {
			localStorage.removeItem('profile');
			const response = await api.createUser(arg.formData);
			arg.navigate('/');
			return response.data;
		} catch (error: any) {
			console.log(error);
			// return error;
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
// =============================================================================================================

export const login = createAsyncThunk(
	'user/login',
	async (
		arg: { formData: AuthFormData; navigate: any },
		{ rejectWithValue }
	) => {
		try {
			localStorage.removeItem('profile');
			const response = await api.login(arg.formData);
			arg.navigate('/');
			return response.data;
		} catch (error: any) {
			// console.log(error);
			const payloadReturn: any = error.response.data;
			return rejectWithValue(payloadReturn);
		}
	}
);
// =============================================================================================================
export const getUser = createAsyncThunk('user/getUser', async () => {
	try {
		const response = await api.getUser();
		return response.data;
	} catch (error) {
		console.log(error);
	}
});
// =============================================================================================================

export const patchUser = createAsyncThunk(
	'user/patchUser',
	async (arg: { formData: any }, thunkAPI) => {
		try {
			const response = await api.patchUser(arg.formData);
			return response.data;
		} catch (error: any) {
			// console.log(error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
// =============================================================================================================

export const deleteUser = createAsyncThunk(
	'user/deleteUser',
	async (arg, thunkAPI) => {
		try {
			const response = await api.deleteUser();
			return response.data;
		} catch (error: any) {
			// console.log(error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

// =============================================================================================================

export const loginDemo = createAsyncThunk(
	'user/loginDemo',
	async (arg: { navigate: any }) => {
		try {
			localStorage.removeItem('profile');
			const response = await api.loginDemo();
			arg.navigate('/');
			return response.data;
		} catch (error) {
			// console.log(error);
		}
	}
);

// =============================================================================================================
// Slice
// =============================================================================================================

const userSlice = createSlice({
	name: 'user',
	initialState: {
		token: '',
		currentUser: '',
		alertUser: 'pending',
		alertMessage: '',
	},
	reducers: {
		logout: (state) => {
			localStorage.removeItem('profile');
			state.token = '';
			state.currentUser = '';
		},
		clearUserAlertMessage: (state) => {
			state.alertMessage = '';
		},
	},
	extraReducers: (build) => {
		build
			.addCase(createUser.pending, (state, action) => {
				state.alertMessage = 'Registering...';
			})
			.addCase(createUser.fulfilled, (state, action) => {
				localStorage.removeItem('profile');
				localStorage.setItem('profile', JSON.stringify(action.payload));
				state.token = action.payload?.token;
				state.alertMessage = action.payload?.message;
			})
			.addCase(createUser.rejected, (state, action: any) => {
				state.alertMessage = action.payload?.message;
			})
			.addCase(login.pending, (state, action) => {
				state.alertMessage = 'Logging in...';
			})
			.addCase(login.fulfilled, (state, action) => {
				localStorage.removeItem('profile');
				localStorage.setItem('profile', JSON.stringify(action.payload));
				state.token = action.payload?.token;
				state.alertMessage = action.payload?.message;
				// does not work
				// setTimeout(() => (state.alertMessage = 'done'), 3000);
			})
			.addCase(login.rejected, (state, action: any) => {
				state.alertMessage = action.payload?.message;
			})
			.addCase(getUser.pending, (state, action) => {})
			.addCase(getUser.fulfilled, (state, action) => {
				state.currentUser = action.payload?.userDetails;
			})
			.addCase(getUser.rejected, (state, action) => {})
			.addCase(patchUser.pending, (state, action) => {})
			.addCase(patchUser.fulfilled, (state, action) => {
				// localStorage.removeItem('profile');
				localStorage.setItem('profile', JSON.stringify(action.payload));
				state.token = action.payload?.token;
				state.alertMessage = action.payload?.message;
			})
			.addCase(patchUser.rejected, (state, action: any) => {
				state.alertMessage = action.payload?.message;
			})
			.addCase(deleteUser.pending, (state, action) => {})
			.addCase(deleteUser.fulfilled, (state, action) => {
				// localStorage.removeItem('profile');
				state.alertMessage = action.payload?.message;
			})
			.addCase(deleteUser.rejected, (state, action: any) => {
				state.alertMessage = action.payload?.message;
			})
			.addCase(loginDemo.pending, (state, action) => {
				state.alertMessage = 'Logging in...';
			})
			.addCase(loginDemo.fulfilled, (state, action) => {
				localStorage.removeItem('profile');
				localStorage.setItem('profile', JSON.stringify(action.payload));
				state.token = action.payload?.token;
			})
			.addCase(loginDemo.rejected, (state, action) => {});
	},
});

// =============================================================================================================
// Exports
// =============================================================================================================

export const { logout, clearUserAlertMessage } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
