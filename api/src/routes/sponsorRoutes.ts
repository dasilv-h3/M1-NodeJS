// src/routes/matchRoutes.ts
import { Router } from 'express';
import {
    fetchAllSponsors,
    fetchSponsorsById,
    addSponsors,
    modifySponsors,
    removeSponsors
} from '../controllers/sponsorController.js';
import { authenticateToken, someProtectedRoute } from '../middleware/authMiddleware.js';
import multer from 'multer';
// import authMiddleware from '../middlewares/authMiddleware.js'; // Assurez-vous d'avoir ce middleware pour la protection des routes

const router = Router();

const upload = multer({
    dest: 'uploads/sponsors'
})

// Routes publiques
router.get('/',  authenticateToken, someProtectedRoute, fetchAllSponsors);
router.get('/:id',  authenticateToken, someProtectedRoute, fetchSponsorsById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/',  authenticateToken, someProtectedRoute, addSponsors);
router.put('/:id',  authenticateToken, someProtectedRoute, modifySponsors);
router.delete('/:id',  authenticateToken, someProtectedRoute, removeSponsors); // Seuls les admins peuvent supprimer

export default router;