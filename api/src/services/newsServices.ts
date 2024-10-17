
import News from '../models/News.js';
import pool from '../utils/db.js';
import mysql from 'mysql2/promise';

export const getAllNews = async (): Promise<News[]> => {
    const [rows] = await pool.query('SELECT * FROM news');
    return rows as News[];
};

export const getNewsById = async (id: number): Promise<News | null> => {
    const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
    const news = rows as News[];
    return news.length > 0 ? news[0] : null;
};

export const createNews = async (news: News): Promise<number> => {
    const { 
        title, 
        resume, 
        description, 
        image, 
        created_at = new Date(), // Date actuelle par défaut si non fournie
        edit_at = new Date(),
        team_id
    } = news;
    const [result] = await pool.execute(
        'INSERT INTO news (title, resume, description, image, created_at, edit_at, team_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, resume, description, image, created_at, edit_at,team_id]
    );
    const insertResult = result as mysql.ResultSetHeader;
    return insertResult.insertId;
};

export const updateNews = async (id: number, news: Partial<News>): Promise<boolean> => {
    const fields = [];
    const values: any[] = [];
    
    for (const key in news) {
        if (news[key as keyof News] !== undefined) {
            fields.push(`${key} = ?`);
            values.push(news[key as keyof News]);
        }
    }

    if (fields.length === 0) return false;

    values.push(id);

    const [result] = await pool.execute(
        `UPDATE news SET ${fields.join(', ')} WHERE id = ?`,
        values
    );

    const updateResult = result as mysql.ResultSetHeader;
    return updateResult.affectedRows > 0;
};

export const deleteNew = async (id: number): Promise<boolean> => {
    const [result] = await pool.execute('DELETE FROM news WHERE id = ?', [id]);
    const deleteResult = result as mysql.ResultSetHeader;
    return deleteResult.affectedRows > 0;
};
