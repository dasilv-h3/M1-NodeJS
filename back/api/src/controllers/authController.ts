import argon2 from 'argon2';
import express, { Request, Response } from 'express';
import Users from '../models/Users.js'; 
import { CreateAUser, findUsersLogin, getAllUsers, getUserByEmail, removeUser, updateUser } from '../services/authServices.js';

const router = express.Router();
type UsersWithRole = Users & { role: string };
// Route de connexion
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const result = await findUsersLogin(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Cast explicite ou garantie du type
    const userWithRole = result.user as UsersWithRole;

    // Si la connexion réussit, renvoyer l'utilisateur et le token
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: userWithRole.id,
        email: userWithRole.email,
        first_name: userWithRole.first_name,
        last_name: userWithRole.last_name,
        role: userWithRole.role, // TypeScript reconnaît maintenant cette propriété
        active: userWithRole.active,
      },
      token: result.token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const logoutUser = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout successful' });
};

export const signUp = async (req: Request, res: Response) => {
  try {
    // Extraction des données de la requête
    const { email, password, first_name, last_name} = req.body;

    // Vérification des champs requis
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Hashage du mot de passe
    const hashedPassword = await argon2.hash(password);

    // Création de l'objet utilisateur
    const newUser: Omit<Users, 'id' | 'created_at'> = {
      email,
      password: hashedPassword, // Mot de passe hashé
      first_name,
      last_name,
      role_id: 2,
      active: false, // Par défaut, l'utilisateur n'est pas actif
      permission: 626
    };

    // Appel à la fonction CreateAUser pour insérer l'utilisateur dans la base de données
    const createdUser = await CreateAUser(newUser);

    // Renvoie la réponse avec l'utilisateur créé (on exclut le mot de passe hashé dans la réponse)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: createdUser[0].id,
        email: createdUser[0].email,
        first_name: createdUser[0].first_name,
        last_name: createdUser[0].last_name,
        role_id: createdUser[0].role_id,
        active: createdUser[0].active,
        permission: createdUser[0].permission,
      },
    });

  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const modifyUser = async (req: Request, res: Response) => {
  try {
    // Récupérer l'id de l'utilisateur depuis les paramètres ou le body (selon l'implémentation)
    const userId = parseInt(req.params.id, 10); // Dans cet exemple, l'ID est dans l'URL
    const { email, password, first_name, last_name, role_id, active, permission } = req.body;

    // Vérification que l'ID est bien fourni
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid or missing user ID' });
    }

    // Vérifier que des données à mettre à jour sont fournies
    if (!email && !password && !first_name && !last_name && role_id === undefined && active === undefined && permission === undefined) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    // Appel de la fonction updateUser pour modifier l'utilisateur
    const updatedUser = await updateUser(userId, { email, password, first_name, last_name, role_id, active, permission });

    // Si aucun utilisateur n'a été trouvé avec cet ID
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Réponse réussie avec l'utilisateur mis à jour (on exclut le mot de passe)
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        role_id: updatedUser.role_id,
        active: updatedUser.active,
        permission: updatedUser.permission,
      },
    });

  } catch (error) {
    console.error('Error during user modification:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
    const userId = parseInt(req.params.id, 10);

    // Vérifier que l'ID est valide
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid or missing user ID' });
    }

    // Appeler la fonction removeUser pour supprimer l'utilisateur
    const isDeleted = await removeUser(userId);

    if (!isDeleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Si la suppression a réussi, envoyer une réponse de succès
    res.status(200).json({ message: 'User deleted successfully' });

  } catch (error) {
    console.error('Error during user deletion:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
      const news = await getAllUsers();
      if (news.length === 0) {
          return res.status(404).json({ message: 'No users found' });
      }
      res.status(200).json(news);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default router;
