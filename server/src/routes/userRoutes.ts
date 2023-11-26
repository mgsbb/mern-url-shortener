import { Router } from 'express';
import {
	createUser,
	getUser,
	patchUser,
	deleteUser,
	login,
	loginDemo,
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', createUser);
router.post('/login', login);
router.get('/:userId', authMiddleware, getUser);
router.patch('/:userId', authMiddleware, patchUser);
router.delete('/:userId', authMiddleware, deleteUser);
router.post('/loginDemo', loginDemo);

export default router;
