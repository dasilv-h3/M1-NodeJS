import { Router } from 'express';
import {
    fetchAllNews,
    fetchNewsById,
    addNew,
    modifyNew,
    removeNew
} from '../controllers/newController.js';
import multer from 'multer';
import { authenticateToken, isActiveId, isAdmin, isEditor } from '../middleware/authMiddleware.js';

const router = Router();

const upload = multer({
    dest: 'uploads/news'
})

// Routes publiques
router.get('/', fetchAllNews);
router.get('/:id', fetchNewsById);

// Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/', authenticateToken, isActiveId, isEditor, upload.any(), addNew);
router.put('/:id', authenticateToken, isActiveId, isEditor, modifyNew);
router.delete('/:id', authenticateToken, isActiveId, isAdmin, removeNew); // Seuls les admins peuvent supprimer

export default router;