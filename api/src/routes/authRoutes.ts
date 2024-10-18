// src/routes/matchRoutes.ts
import { Router } from 'express';
import {
    deleteUser,
    modifyUser,
    signUp,
    loginUser,
    logoutUser,
    fetchAllUsers
} from '../controllers/authController.js';
import { authenticateToken, isAdmin, someProtectedRoute } from '../middleware/authMiddleware.js';
// import authMiddleware from '../middlewares/authMiddleware.js'; // Assurez-vous d'avoir ce middleware pour la protection des routes

const router = Router();

// Routes publiques
router.get('/', authenticateToken, isAdmin, someProtectedRoute, fetchAllUsers);


// // Routes protégées (par exemple, création, modification, suppression de matchs)
router.post('/signUp', signUp);
router.post('/login', loginUser);
router.post('/logout', authenticateToken, someProtectedRoute, logoutUser);
router.put('/:id', authenticateToken, someProtectedRoute, modifyUser);
router.delete('/:id', authenticateToken, someProtectedRoute, deleteUser);

// router.delete('/:id', removeMatch); // Seuls les admins peuvent supprimer

export default router;