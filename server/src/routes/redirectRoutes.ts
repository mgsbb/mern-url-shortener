import { Router } from 'express';
import { redirect } from '../controllers/redirectController.js';

const router = Router();

router.get('/:shortlink', redirect);

export default router;
