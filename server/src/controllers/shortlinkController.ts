import ShortlinkModel from '../models/shortlinkModel.js';
import UserModel from '../models/userModel.js';
import { Request, Response } from 'express';

// =============================================================================================================
// Controllers
// =============================================================================================================
export const getAllShortlinksOfUser = async (req: any, res: Response) => {
	try {
		const { userId } = req.tokenData;
		const allShortlinks = await ShortlinkModel.find({ creator: userId });
		res.status(200).json({ allShortlinks });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
// =============================================================================================================

export const createShortlink = async (req: any, res: Response) => {
	try {
		const { userId } = req.tokenData;
		const { title, description, target, shortlink } = req.body.formData;

		const exisingShortlink = await ShortlinkModel.findOne({ shortlink });

		if (exisingShortlink) {
			return res.status(404).json({ message: 'Shortlink already in use.' });
		}

		// logic to create shortlink
		if (shortlink === '') {
			// generate
			console.log('generate');
		}

		const newShortlink = await ShortlinkModel.create({
			title,
			description,
			target,
			shortlink,
			creator: userId,
		});

		await UserModel.findByIdAndUpdate(userId);
		res.status(201).json({ newShortlink, message: 'Created succesfully.' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
// =============================================================================================================

export const getShortlink = async (req: Request, res: Response) => {
	try {
		const { shortlinkId } = req.params;
		const shortlink = await ShortlinkModel.findById(shortlinkId);
		if (!shortlink) {
			return res.status(404).send({ message: 'Not found' });
		}
		res.status(200).send({ shortlink });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
// =============================================================================================================

export const patchShortlink = async (req: Request, res: Response) => {
	try {
		const { shortlinkId } = req.params;
		const { title, description, target, shortlink } = req.body.formData;

		const shortlinkToPatch = await ShortlinkModel.findById(shortlinkId);

		const exisingShortlink = await ShortlinkModel.findOne({ shortlink });

		if (
			exisingShortlink &&
			exisingShortlink?.shortlink !== shortlinkToPatch?.shortlink
		) {
			return res.status(404).json({ message: 'Shortlink already in use.' });
		}

		const patchedShortlink = await ShortlinkModel.findByIdAndUpdate(
			shortlinkId,
			{
				title,
				description,
				target,
				shortlink,
			}
		);

		res.status(200).json({ patchedShortlink });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
// =============================================================================================================

export const deleteShortlink = async (req: Request, res: Response) => {
	try {
		const { shortlinkId } = req.params;
		const shortlink = await ShortlinkModel.findByIdAndDelete(shortlinkId);
		if (!shortlink) {
			return res.status(404).send({ message: 'Not found' });
		}
		res.status(200).send({ message: 'Success' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
// =============================================================================================================

export const getAllShortlinksWithFilters = async (req: any, res: Response) => {
	try {
		const { page, search, sort } = req.query;
		const { userId } = req.tokenData;

		const regExp = new RegExp(search, 'i');

		const queryObject: any = {
			creator: userId,
		};

		if (search !== '~') {
			queryObject.$or = [
				{ title: regExp },
				{ shortlink: regExp },
				{ description: regExp },
				{ target: regExp },
			];
		}

		let result = ShortlinkModel.find(queryObject);

		//sort
		if (sort === 'az') {
			console.log('az sort');
			result.sort('title');
		}
		if (sort === 'za') {
			console.log('za sort');
			result.sort('-title');
		}
		if (sort === 'latest') {
			console.log('latest sort');
			result.sort('-createdAt');
		}
		if (sort === 'oldest') {
			console.log('oldest sort');
			result.sort('createdAt');
		}

		const finalResult = await result;

		res.status(200).json({ finalResult });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
