// src/routes/matchRoutes.ts
import { Router } from 'express';
import {
    fetchAllNews,
    fetchNewsById,
    addNew,
    modifyNew,
    removeNew
} from '../controllers/newController.js';
// import authMiddleware from '../middlewares/authMiddleware.js'; // Assurez-vous d'avoir ce middleware pour la protection des routes

const router = Router();

// Routes publiques
router.get('/', fetchAllNews);
router.get('/:id', fetchNewsById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/', addNew);
router.put('/:id', modifyNew);
router.delete('/:id', removeNew); // Seuls les admins peuvent supprimer

export default router;