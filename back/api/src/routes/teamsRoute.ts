import { Router } from 'express';
import { fetchAllTeams } from '../controllers/teamController.js';
import { authenticateToken, isActiveId, isEditor } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', fetchAllTeams);


export default router;