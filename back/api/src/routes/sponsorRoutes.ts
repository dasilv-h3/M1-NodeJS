import { Router } from 'express';
import {
    fetchAllSponsors,
    fetchSponsorsById,
    addSponsors,
    modifySponsors,
    removeSponsors
} from '../controllers/sponsorController.js';
import { authenticateToken, isActiveId, isAdmin, isEditor } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = Router();

const upload = multer({
    dest: 'uploads/sponsors'
})

// Routes publiques
router.get('/', fetchAllSponsors);
router.get('/:id',  authenticateToken, isActiveId, fetchSponsorsById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/',  authenticateToken, isActiveId, isEditor, upload.single('logo'), addSponsors);
router.put('/:id',  authenticateToken, isActiveId, isEditor, upload.single('logo'), modifySponsors);
router.delete('/:id',  authenticateToken, isActiveId, isAdmin, removeSponsors); // Seuls les admins peuvent supprimer

export default router;