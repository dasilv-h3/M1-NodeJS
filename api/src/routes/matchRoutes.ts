import { Router } from 'express';
import {
    fetchAllMatches,
    fetchMatchById,
    addMatch,
    modifyMatch,
    removeMatch,
    fetchPreviousMatches,
    fetchNextMatches
} from '../controllers/matchController.js';
import { authenticateToken, isActiveId, isAdmin, isEditor} from '../middleware/authMiddleware.js';

const router = Router();

// Routes publiques
router.get('/', authenticateToken, isActiveId, fetchAllMatches);
router.get('/previousMatches', authenticateToken, isActiveId, fetchPreviousMatches);
router.get('/nextMatches', authenticateToken, isActiveId, fetchNextMatches);
router.get('/:id', authenticateToken, isActiveId, fetchMatchById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/', authenticateToken, isActiveId, isEditor, addMatch);
router.put('/:id', authenticateToken, isActiveId, isEditor, modifyMatch);
router.delete('/:id', authenticateToken, isActiveId, isAdmin, removeMatch); // Seuls les admins peuvent supprimer

export default router;