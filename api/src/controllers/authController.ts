import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import express, { Request, Response } from 'express';
import User from './models/User'; 
import { IUser } from './interfaces/User'; 

const router = express.Router();

// Route de connexion
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Vérification si l'utilisateur existe
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }

    // Vérification du mot de passe avec Argon2
    const isPasswordValid: boolean = await argon2.verify(user.mot_de_passe, password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Mot de passe incorrect' });
      return;
    }

    // Génération du token JWT
    const token: string = jwt.sign(
      { id: user.id, role: user.role },  // Données encodées dans le token
      process.env.JWT_SECRET as string,  // Clé secrète
      { expiresIn: process.env.JWT_EXPIRES_IN || '86400s' }
    );

    // Renvoi du token au client
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

export default router;
