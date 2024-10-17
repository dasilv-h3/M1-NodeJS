import Users from "../models/Users.js";
import pool from '../utils/db.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (): Promise<Users[]> => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows as Users[];
};

export const CreateAUser = async (newUser: Omit<Users, 'id' | 'created_at'>): Promise<Users[]> => {
    try {
      // Déstructuration des champs de l'utilisateur sans id ni created_at (générés automatiquement)
      const { email, password, first_name, last_name, role_id, active, permission } = newUser;
  
      // Insertion de l'utilisateur dans la base de données
      const [result] = await pool.execute(
        `INSERT INTO users (email, password, first_name, last_name, role_id, active, permission) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [email, password, first_name, last_name, role_id, active, permission]
      );
  
      const insertId = (result as any).insertId;
  
      // Récupération de l'utilisateur créé après insertion (pour vérifier)
      const [rows] = await pool.execute(
        `SELECT * FROM users WHERE id = ?`,
        [insertId]
      );
  
      return rows as Users[];
  
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error while creating user');
    }
};

export const updateUser = async (id: number, updatedUser: Partial<Omit<Users, 'id' | 'created_at'>>): Promise<Users | null> => {
  try {
    // Déstructuration des champs de l'utilisateur à mettre à jour
    const { email, password, first_name, last_name, role_id, active, permission } = updatedUser;

    // Création de la requête SQL dynamique pour mettre à jour uniquement les champs fournis
    let query = 'UPDATE users SET ';
    const fields: any[] = [];
    
    if (email) {
      query += 'email = ?, ';
      fields.push(email);
    }
    if (password) {
      query += 'password = ?, ';
      fields.push(await argon2.hash(password)); // Hashage du nouveau mot de passe
    }
    if (first_name) {
      query += 'first_name = ?, ';
      fields.push(first_name);
    }
    if (last_name) {
      query += 'last_name = ?, ';
      fields.push(last_name);
    }
    if (role_id !== undefined) {
      query += 'role_id = ?, ';
      fields.push(role_id);
    }
    if (active !== undefined) {
      query += 'active = ?, ';
      fields.push(active);
    }
    if (permission !== undefined) {
      query += 'permission = ?, ';
      fields.push(permission);
    }

    // Supprimer la dernière virgule et ajouter la clause WHERE
    query = query.slice(0, -2) + ' WHERE id = ?';
    fields.push(id);

    // Exécution de la requête de mise à jour
    const [result] = await pool.execute(query, fields);

    // Vérifier si l'utilisateur a été mis à jour
    if ((result as any).affectedRows === 0) {
      return null; // Aucun utilisateur trouvé avec cet ID
    }

    // Récupérer l'utilisateur mis à jour pour le retourner
    const [rows] = await pool.execute(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    return (rows as Users[])[0]; // Retourne l'utilisateur mis à jour

  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error while updating user');
  }
};

export const removeUser = async (id: number): Promise<boolean> => {
  try {
    // Exécution de la requête SQL pour supprimer un utilisateur en fonction de l'ID
    const [result] = await pool.execute(
      `DELETE FROM users WHERE id = ?`,
      [id]
    );

    // Vérification si l'utilisateur a été supprimé
    if ((result as any).affectedRows === 0) {
      return false; // Aucun utilisateur trouvé avec cet ID
    }

    return true; // L'utilisateur a été supprimé avec succès
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error while deleting user');
  }
};



export const findUsersLogin = async (email: string, password: string): Promise<{ user: Users; token: string } | null> => {
  try {
      // 1. Récupérer l'utilisateur par son email
      const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
      const user = (rows as Users[])[0];

      if (!user) {
          // Si aucun utilisateur n'est trouvé, la connexion échoue
          return null; // Connexion refusée
      }

      // 2. Vérifier le mot de passe
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
          // Si le mot de passe est incorrect, la connexion échoue
          return null; // Connexion refusée
      }

      // 3. Générer un token JWT
      const token = jwt.sign(
          { id: user.id, email: user.email, role_id: user.role_id }, // Inclure les informations pertinentes dans le token
          process.env.JWT_SECRET as string, // Votre clé secrète JWT qui est définie dans le .env
          { expiresIn: '1h' } // Le token expirera après 1 heure
      );

      // Si la connexion réussit, retourner l'utilisateur et le token
      return { user, token };

  } catch (error) {
      console.error('Error during user login:', error);
      throw new Error('Error while logging in user');
  }
};