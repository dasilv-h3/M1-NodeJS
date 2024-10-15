import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Interface pour définir la structure des données du token décodé
interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

// Middleware pour protéger les routes
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // Récupération du token dans l'en-tête Authorization
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    return;
  }

  try {
    // Vérification du token
    const verified = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    req.user = verified;  // Stockage des données utilisateur dans req.user
    next();  // Passe à la prochaine fonction
  } catch (error) {
    res.status(400).json({ message: 'Token invalide ou expiré.' });
  }
};

export default verifyToken;
