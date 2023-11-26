import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

// =============================================================================================================
// Controllers
// =============================================================================================================
export const createUser = async (req: Request, res: Response) => {
	const { firstName, lastName, email, password, confirmPassword } =
		req.body.formData;
	try {
		if (password !== confirmPassword) {
			return res.status(400).send({ message: `Passwords don't match` });
		}

		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res.status(400).send({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await UserModel.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		const token = jwt.sign(
			{
				userId: newUser._id,
				firstName,
				lastName,
				email,
				isDemo: false,
			},
			process.env.JWT_SECRET || '',
			{ expiresIn: process.env.JWT_EXPIRY }
		);
		res
			.status(201)
			.json({ token, message: 'User created successfully. Redirecting.' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
// =============================================================================================================

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body.formData;
	try {
		const existingUser: any = await UserModel.findOne({ email });
		if (!existingUser) {
			return res.status(404).send({ message: 'User does not exist' });
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect) {
			return res.status(404).send({ message: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{
				userId: existingUser._id,
				firstName: existingUser.firstName,
				lastName: existingUser.lastName,
				email,
				isDemo: false,
			},
			process.env.JWT_SECRET || '',
			{ expiresIn: process.env.JWT_EXPIRY }
		);

		res.status(200).send({ token, message: 'Login successful. Redirecting.' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Invalid credentials' });
	}
};
// =============================================================================================================

export const patchUser = async (req: Request | any, res: Response) => {
	try {
		const { firstName, lastName, email, currentPassword, newPassword } =
			req.body.formData;
		const { userId } = req.tokenData;
		const existingUser: any = await UserModel.findById(userId);
		if (!existingUser) {
			return res.status(404).send({ message: 'User does not exist' });
		}

		const isPasswordCorrect = await bcrypt.compare(
			currentPassword,
			existingUser.password
		);
		if (!isPasswordCorrect) {
			return res.status(404).send({ message: 'Invalid credentials' });
		}

		const newHashedPassword = await bcrypt.hash(newPassword, 12);

		const newUserDetails = {
			firstName: firstName.length > 0 ? firstName : existingUser.firstName,
			lastName: lastName.length > 0 ? lastName : existingUser.lastName,
			email: email.length > 0 ? email : existingUser.email,
			password:
				newPassword.length > 0 ? newHashedPassword : existingUser.password,
		};

		const updatedUser: any = await UserModel.findByIdAndUpdate(userId, {
			...newUserDetails,
		});

		const token = jwt.sign(
			{
				userId: updatedUser._id,
				firstName,
				lastName,
				email,
				isDemo: false,
			},
			process.env.JWT_SECRET || '',
			{ expiresIn: process.env.JWT_EXPIRY }
		);

		res.status(200).json({ token, message: 'User updated successfully.' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
// =============================================================================================================

export const deleteUser = async (req: Request | any, res: Response) => {
	try {
		const { userId } = req.tokenData;

		// const existingUser: any = await UserModel.findOne({ _id: userId });
		const existingUser: any = await UserModel.findById(userId);

		if (!existingUser) {
			return res.status(404).send({ message: 'User does not exist' });
		}

		// const isPasswordCorrect = await bcrypt.compare(
		// 	password,
		// 	existingUser.password
		// );
		// if (!isPasswordCorrect) {
		// 	return res.status(404).send({ message: 'Invalid credentials' });
		// }

		const deletedUser = await UserModel.findByIdAndDelete(userId);
		res.status(200).send({ message: 'User deletetion success. Redirecting.' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
// =============================================================================================================

export const getUser = async (req: Request | any, res: Response) => {
	try {
		const { userId } = req.tokenData;
		const user = await UserModel.findById(userId);
		const userDetails = {
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			isDemo: user?.isDemo,
		};

		res.status(200).json({ userDetails });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
// =============================================================================================================

export const loginDemo = async (req: Request, res: Response) => {
	const demoUserId = '63ef027fdae7e4d7fb6bca96';
	try {
		const demoUser: any = await UserModel.findById(demoUserId);

		const token = jwt.sign(
			{
				userId: demoUser._id,
				firstName: demoUser.firstName,
				lastName: demoUser.lastName,
				email: demoUser.email,
				isDemo: demoUser.isDemo,
			},
			process.env.JWT_SECRET || '',
			{ expiresIn: process.env.JWT_EXPIRY }
		);

		res.status(200).send({ token, message: 'Login successful. Redirecting.' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
