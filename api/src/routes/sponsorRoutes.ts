// src/routes/matchRoutes.ts
import { Router } from 'express';
import {
    fetchAllSponsors,
    fetchSponsorsById,
    addSponsors,
    modifySponsors,
    removeSponsors
} from '../controllers/sponsorController.js';
// import authMiddleware from '../middlewares/authMiddleware.js'; // Assurez-vous d'avoir ce middleware pour la protection des routes

const router = Router();

// Routes publiques
router.get('/', fetchAllSponsors);
router.get('/:id', fetchSponsorsById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/', addSponsors);
router.put('/:id', modifySponsors);
router.delete('/:id', removeSponsors); // Seuls les admins peuvent supprimer

export default router;