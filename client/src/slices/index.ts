import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import shortlinkReducer from './shortlinkSlice';
import modalReducer from './modalSlice';

export default combineReducers({
	user: userReducer,
	shortlinks: shortlinkReducer,
	modal: modalReducer,
});
