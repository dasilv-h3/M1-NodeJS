// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Users from '../models/Users.js'; // Assurez-vous d'importer correctement

const JWT_SECRET = process.env.JWT_SECRET || '478exhZT';
// l'ID du rôle d'admin égale 1.
const ADMIN_ROLE_ID = 1;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 'Bearer TOKEN'

    console.log("token:", token);
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied: No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user: JwtPayload | string | undefined) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Type assertion pour s'assurer que user est de type Users
        if (typeof user === 'object' && user !== null) {
            req.user = user as Users; // Assertion de type
        } else {
            req.user = undefined; // Si ce n'est pas un objet valide, le définir comme undefined
        }

        next(); // Passer au middleware ou à la route suivante
    });
};

export const someProtectedRoute = (req: Request, res: Response) => {
    res.status(200).json({ message: 'You have access to this protected route', user: req.user });
};

// Middleware pour vérifier si l'utilisateur est un admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // Vérification que l'utilisateur est connecté et a un rôle
    if (!req.user) {
        return res.status(401).json({ message: 'Access denied: No user logged in' });
    }

    const user: Users = req.user;

    // Vérification si le rôle est admin
    if (user.role_id !== ADMIN_ROLE_ID) {
        return res.status(403).json({ message: 'Access denied: You are not authorized to access this resource' });
    }

    // Si l'utilisateur est un admin, passer au middleware suivant ou à la route
    next();
};
