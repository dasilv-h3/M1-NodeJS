// src/routes/matchRoutes.ts
import { Router } from 'express';
import {
    fetchAllNews,
    fetchNewsById,
    addNew,
    modifyNew,
    removeNew
} from '../controllers/newController.js';
import { authenticateToken, someProtectedRoute } from '../middleware/authMiddleware.js';
// import authMiddleware from '../middlewares/authMiddleware.js'; // Assurez-vous d'avoir ce middleware pour la protection des routes

const router = Router();

// Routes publiques
router.get('/',  authenticateToken, someProtectedRoute, fetchAllNews);
router.get('/:id',  authenticateToken, someProtectedRoute, fetchNewsById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/',  authenticateToken, someProtectedRoute, addNew);
router.put('/:id',  authenticateToken, someProtectedRoute, modifyNew);
router.delete('/:id',  authenticateToken, someProtectedRoute, removeNew); // Seuls les admins peuvent supprimer

export default router;