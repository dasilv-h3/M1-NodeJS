// src/routes/matchRoutes.ts
import { Router } from 'express';
import {
    fetchAllMatches,
    fetchMatchById,
    addMatch,
    modifyMatch,
    removeMatch
} from '../controllers/matchController.js';
import { authenticateToken, someProtectedRoute } from '../middleware/authMiddleware.js';
// import authMiddleware from '../middlewares/authMiddleware.js'; // Assurez-vous d'avoir ce middleware pour la protection des routes

const router = Router();

// Routes publiques
router.get('/',  authenticateToken, someProtectedRoute, fetchAllMatches);
router.get('/:id',  authenticateToken, someProtectedRoute, fetchMatchById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/',  authenticateToken, someProtectedRoute, addMatch);
router.put('/:id',  authenticateToken, someProtectedRoute, modifyMatch);
router.delete('/:id',  authenticateToken, someProtectedRoute, removeMatch); // Seuls les admins peuvent supprimer

export default router;