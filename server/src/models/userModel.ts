import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		firstName: { type: String },
		lastName: { type: String },
		email: { type: String },
		password: { type: String },
		shortlinks: { type: Schema.Types.ObjectId, ref: 'Shortlink' },
		isDemo: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const UserModel = model('User', userSchema);
export default UserModel;
