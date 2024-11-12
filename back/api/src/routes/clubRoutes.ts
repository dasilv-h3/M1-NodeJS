import { Router } from 'express';
import {
    fetchClub,
    modifyClub,
} from '../controllers/clubController.js';
import { authenticateToken, isActiveId, isEditor } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', fetchClub);

router.put('/:id', authenticateToken, isActiveId, isEditor, modifyClub);


export default router;