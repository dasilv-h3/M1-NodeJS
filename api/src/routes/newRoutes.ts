import { Router } from 'express';
import {
    fetchAllNews,
    fetchNewsById,
    addNew,
    modifyNew,
    removeNew
} from '../controllers/newController.js';
import multer from 'multer';
import { authenticateToken, isActive, isAdmin, isEditor, someProtectedRoute } from '../middleware/authMiddleware.js';

const router = Router();

const upload = multer({
    dest: 'uploads/news'
})

// Routes publiques
router.get('/', authenticateToken, isActive, fetchAllNews);
router.get('/:id', authenticateToken, isActive, fetchNewsById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/', authenticateToken, isActive, isEditor, addNew);
router.put('/:id', authenticateToken, isActive, isEditor, modifyNew);
router.delete('/:id', authenticateToken, isActive, isAdmin, removeNew); // Seuls les admins peuvent supprimer

export default router;