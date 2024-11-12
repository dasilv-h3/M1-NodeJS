import { Router } from 'express';
import {
    deleteUser,
    modifyUser,
    signUp,
    loginUser,
    logoutUser,
    fetchAllUsers
} from '../controllers/authController.js';
import { authenticateToken, isActiveId, isActiveEmail, isAdmin } from '../middleware/authMiddleware.js';
// import authMiddleware from '../middlewares/authMiddleware.js'; // Assurez-vous d'avoir ce middleware pour la protection des routes

const router = Router();

// Routes publiques
router.get('/', fetchAllUsers);


// // Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/signUp', signUp);
router.post('/login', isActiveEmail, loginUser);
router.post('/logout', authenticateToken, isActiveId, logoutUser);
router.put('/:id', authenticateToken, isActiveId, isAdmin, modifyUser);
router.delete('/:id', authenticateToken, isActiveId, isAdmin, deleteUser);  // Seuls les admins peuvent supprimer

export default router;