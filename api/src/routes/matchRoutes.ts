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
import { authenticateToken, isActive, isAdmin, isEditor} from '../middleware/authMiddleware.js';

const router = Router();

// Routes publiques
router.get('/', authenticateToken, isActive, fetchAllMatches);
router.get('/previousMatches', authenticateToken, isActive, fetchPreviousMatches);
router.get('/nextMatches', authenticateToken, isActive, fetchNextMatches);
router.get('/:id', authenticateToken, isActive, fetchMatchById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/', authenticateToken, isActive, isEditor, addMatch);
router.put('/:id', authenticateToken, isActive, isEditor, modifyMatch);
router.delete('/:id', authenticateToken, isActive, isAdmin, removeMatch); // Seuls les admins peuvent supprimer

export default router;