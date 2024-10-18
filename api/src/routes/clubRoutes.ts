import { Router } from 'express';
import {
    fetchClub,
    modifyClub,
} from '../controllers/clubController.js';
import { isActive } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', isActive, fetchClub);

router.put('/:id', isActive, modifyClub);


export default router;