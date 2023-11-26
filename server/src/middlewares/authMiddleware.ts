import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (
	req: Request | any,
	res: Response,
	next: NextFunction
) => {
	try {
		let token = req?.headers?.authorization?.split(' ')[1];
		let decodedData;

		const JWT_SECRET = process.env.JWT_SECRET || '';

		if (!token) {
			throw new Error('There is no token found');
		}

		if (token) {
			decodedData = jwt.verify(token, JWT_SECRET);
			req.tokenData = decodedData;
		}

		next();
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized action' });
	}
};

export default authMiddleware;
