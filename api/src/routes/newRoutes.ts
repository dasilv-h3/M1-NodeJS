// src/routes/matchRoutes.ts
import { Router } from 'express';
import {
    fetchAllNews,
    fetchNewsById,
    addNew,
    modifyNew,
    removeNew
} from '../controllers/newController.js';
import multer from 'multer';
import { authenticateToken, someProtectedRoute } from '../middleware/authMiddleware.js';
// import authMiddleware from '../middlewares/authMiddleware.js'; // Assurez-vous d'avoir ce middleware pour la protection des routes

const router = Router();

const upload = multer({
    dest: 'uploads/news'
})

// Routes publiques
router.get('/',  authenticateToken, someProtectedRoute, fetchAllNews);
router.get('/:id',  authenticateToken, someProtectedRoute, fetchNewsById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/', addNew);
router.put('/:id', modifyNew);
router.delete('/:id', removeNew); // Seuls les admins peuvent supprimer

export default router;