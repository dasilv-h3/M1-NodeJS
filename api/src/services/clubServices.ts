import pool from '../utils/db.js';
import Club from '../models/Club.js';
import mysql, { RowDataPacket } from 'mysql2/promise';

export const getClub = async (): Promise<Club[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM club');
    return rows as Club[];
};

export const updateClub = async (club: Partial<Club>): Promise<boolean> => {
    const fields = [];
    const values: any[] = [];

    for (const key in club) {
        if (club[key as keyof Club] !== undefined) {
            fields.push(`${key} = ?`);
            values.push(club[key as keyof Club]);
        }
    }

    if (fields.length === 0) return false;

    const [result] = await pool.execute(
        `UPDATE club SET ${fields.join(', ')} LIMIT 1`,
        values
    );

    const updateResult = result as mysql.ResultSetHeader;
    return updateResult.affectedRows > 0;
};