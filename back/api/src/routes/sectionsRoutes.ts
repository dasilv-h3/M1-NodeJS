import { Router } from 'express';
import { fetchAllSections } from '../controllers/sectionController.js';
import { authenticateToken, isActiveId, isEditor } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', fetchAllSections);


export default router;