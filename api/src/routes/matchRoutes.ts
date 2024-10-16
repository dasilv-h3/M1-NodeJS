// src/routes/matchRoutes.ts
import { Router } from 'express';
import {
    fetchAllMatches,
    fetchMatchById,
    addMatch,
    modifyMatch,
    removeMatch
} from '../controllers/matchController.js';
// import authMiddleware from '../middlewares/authMiddleware.js'; // Assurez-vous d'avoir ce middleware pour la protection des routes

const router = Router();

// Routes publiques
router.get('/', fetchAllMatches);
router.get('/:id', fetchMatchById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/', addMatch);
router.put('/:id', modifyMatch);
router.delete('/:id', removeMatch); // Seuls les admins peuvent supprimer

export default router;