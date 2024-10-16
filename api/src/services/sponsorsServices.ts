
import Sponsors from '../models/Sponsors.js';
import pool from '../utils/db.js';
import mysql from 'mysql2/promise';

export const getAllSponsors = async (): Promise<Sponsors[]> => {
    const [rows] = await pool.query('SELECT * FROM sponsors');
    return rows as Sponsors[];
};

export const getSponsorsById = async (id: number): Promise<Sponsors | null> => {
    const [rows] = await pool.query('SELECT * FROM sponsors WHERE id = ?', [id]);
    const sponso = rows as Sponsors[];
    return sponso.length > 0 ? sponso[0] : null;
};

export const createSponsors = async (sponso: Sponsors): Promise<number> => {
    const { logo, url} = sponso;
    const [result] = await pool.execute(
        'INSERT INTO sponsors (logo, url) VALUES (?, ?)',
        [logo, url]
    );
    const insertResult = result as mysql.ResultSetHeader;
    return insertResult.insertId;
};

export const updateSponsors = async (id: number, sponso: Partial<Sponsors>): Promise<boolean> => {
    const fields = [];
    const values: any[] = [];
    
    for (const key in sponso) {
        if (sponso[key as keyof Sponsors] !== undefined) {
            fields.push(`${key} = ?`);
            values.push(sponso[key as keyof Sponsors]);
        }
    }

    if (fields.length === 0) return false;

    values.push(id);

    const [result] = await pool.execute(
        `UPDATE sponsors SET ${fields.join(', ')} WHERE id = ?`,
        values
    );

    const updateResult = result as mysql.ResultSetHeader;
    return updateResult.affectedRows > 0;
};

export const deleteSponsors = async (id: number): Promise<boolean> => {
    const [result] = await pool.execute('DELETE FROM sponsors WHERE id = ?', [id]);
    const deleteResult = result as mysql.ResultSetHeader;
    return deleteResult.affectedRows > 0;
};
