import { Router } from 'express';
import {
    fetchAllSponsors,
    fetchSponsorsById,
    addSponsors,
    modifySponsors,
    removeSponsors
} from '../controllers/sponsorController.js';
import { authenticateToken, isActive, isAdmin, isEditor, someProtectedRoute } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = Router();

const upload = multer({
    dest: 'uploads/sponsors'
})

// Routes publiques
router.get('/',  authenticateToken, isActive, fetchAllSponsors);
router.get('/:id',  authenticateToken, isActive, fetchSponsorsById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/',  authenticateToken, isActive, isEditor, addSponsors);
router.put('/:id',  authenticateToken, isActive, isEditor, modifySponsors);
router.delete('/:id',  authenticateToken, isActive, isAdmin, removeSponsors); // Seuls les admins peuvent supprimer

export default router;