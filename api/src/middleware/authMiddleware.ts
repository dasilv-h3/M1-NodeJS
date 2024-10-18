import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Users from '../models/Users.js'; // Assurez-vous d'importer correctement
import { getUserByEmail, getUserById } from '../services/authServices.js';

const JWT_SECRET = process.env.JWT_SECRET || '478exhZT';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 'Bearer TOKEN'

    
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

export const isActiveId = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserById(req.user?.id as number);
    console.log("IS ACTIVE ID", user);
    
    if (user) {
        if(user.active) {
            next();
        }
    } else {
        return res.status(401).json({ message: 'Access denied: Your account is not active !' });
    }
};

export const isActiveEmail = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserByEmail(req.body.email);
    console.log(user);
    
    if (user) {
        if(user.active) {
            next();
        }
    } else {
        return res.status(401).json({ message: 'Access denied: Your account is not active !' });
    }
};

export const isEditor = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserById(req.user?.id as number);
    console.log("IS EDITOR", user);
        
    if (user) {
        if (user.role_id == 2) {
            next();
        } else {
            return res.status(401).json({ message: 'Access denied: Your account is not editor !' });
        }
    } else {
        return res.status(404).json({ message: 'Not found: User not found !' });
    }
    
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserById(req.user?.id as number);
    if (user) {
        if (user.role_id == 1) {
            next();
        } else {
            return res.status(401).json({ message: 'Access denied: Your account is not admin !' });
        }
    } else {
        return res.status(404).json({ message: 'Not found: User not found !' });
    }
    
};


