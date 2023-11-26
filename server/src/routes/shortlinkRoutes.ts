import { Router } from 'express';
import {
	getAllShortlinksOfUser,
	createShortlink,
	getShortlink,
	patchShortlink,
	deleteShortlink,
	getAllShortlinksWithFilters,
} from '../controllers/shortlinkController.js';
import authMiddlware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/f', authMiddlware, getAllShortlinksWithFilters);
router.get('/', authMiddlware, getAllShortlinksOfUser);
router.post('/', authMiddlware, createShortlink);
router.get('/:shortlinkId', getShortlink);
router.patch('/:shortlinkId', patchShortlink);
router.delete('/:shortlinkId', deleteShortlink);

export default router;
