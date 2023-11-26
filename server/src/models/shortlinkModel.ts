import { Schema, model } from 'mongoose';

const shortlinkSchema = new Schema(
	{
		title: { type: String },
		description: { type: String },
		target: { type: String },
		shortlink: { type: String },
		creator: { type: Schema.Types.ObjectId, ref: 'User' },
		timesVisited: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const ShortlinkModel = model('Shortlink', shortlinkSchema);
export default ShortlinkModel;
