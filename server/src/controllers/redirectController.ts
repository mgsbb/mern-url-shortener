import { Request, Response } from 'express';
import ShortlinkModel from '../models/shortlinkModel.js';

export const redirect = async (req: Request, res: Response) => {
	const { shortlink } = req.params;

	try {
		const shortlinkEntry: any = await ShortlinkModel.findOne({ shortlink });

		if (!shortlinkEntry) {
			res.status(404).json({ message: 'URL not found' });
		}

		const target: any = shortlinkEntry?.target;

		await ShortlinkModel.findByIdAndUpdate(shortlinkEntry?._id, {
			timesVisited: shortlinkEntry?.timesVisited + 1,
		});

		const node_env = process.env.NODE_ENV_FROM_FILE;

		if (node_env === 'dev') {
			// redirect from client - works in dev - not in deployed
			return res.status(200).json({ target: targetGenerator(target) });
		}

		// redirect from server
		// res.redirect(`https://${target}`);
		// res.redirect(`${target}`);
		res.redirect(`${targetGenerator(target)}`);
	} catch (error) {
		console.log(error);
	}
};

// =============================================================================================================
// Helpers
// =============================================================================================================

const targetGenerator = (targetFromModel: any) => {
	let result;

	if (targetFromModel.startsWith('https://')) {
		result = targetFromModel;
	} else {
		result = 'https://' + targetFromModel;
	}

	return result;
};
