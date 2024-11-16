import { Router } from 'express';
import {
    fetchAllMatches,
    fetchMatchById,
    addMatch,
    modifyMatch,
    removeMatch,
    fetchPreviousMatches,
    fetchNextMatches,
    fetchAllMatchesMasculinJunior,
    fetchAllMatchesMasculinSenior,
    fetchAllMatchesFemininJunior,
    fetchAllMatchesFemininSenior
} from '../controllers/matchController.js';
import { authenticateToken, isActiveId, isAdmin, isEditor} from '../middleware/authMiddleware.js';

const router = Router();

// Routes publiques
router.get('/', authenticateToken, isActiveId, fetchAllMatches);
router.get('/masculinjunior', fetchAllMatchesMasculinJunior);
router.get('/masculinsenior', fetchAllMatchesMasculinSenior);
router.get('/femininjunior', fetchAllMatchesFemininJunior);
router.get('/femininsenior', fetchAllMatchesFemininSenior);
router.get('/previousMatches', fetchPreviousMatches);
router.get('/nextMatches', fetchNextMatches);
router.get('/:id', authenticateToken, isActiveId, fetchMatchById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/', authenticateToken, isActiveId, isEditor, addMatch);
router.put('/:id', authenticateToken, isActiveId, isEditor, modifyMatch);
router.delete('/:id', authenticateToken, isActiveId, isAdmin, removeMatch); // Seuls les admins peuvent supprimer

export default router;