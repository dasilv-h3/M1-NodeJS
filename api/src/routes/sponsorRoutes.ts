// src/routes/matchRoutes.ts
import { Router } from 'express';
import {
    fetchAllSponsors,
    fetchSponsorsById,
    addSponsors,
    modifySponsors,
    removeSponsors
} from '../controllers/sponsorController.js';
import multer from 'multer';
// import authMiddleware from '../middlewares/authMiddleware.js'; // Assurez-vous d'avoir ce middleware pour la protection des routes

const router = Router();

const upload = multer({
    dest: 'uploads/sponsors'
})

// Routes publiques
router.get('/', fetchAllSponsors);
router.get('/:id', fetchSponsorsById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/', upload.any(), addSponsors);
router.put('/:id', upload.any(), modifySponsors);
router.delete('/:id', removeSponsors); // Seuls les admins peuvent supprimer

export default router;