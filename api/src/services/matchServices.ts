
import pool from '../utils/db.js';
import Match from '../models/Matches.js';
import mysql from 'mysql2/promise';

export const getAllMatches = async (): Promise<Match[]> => {
    const [rows] = await pool.query('SELECT * FROM matches');
    return rows as Match[];
};

export const getMatchById = async (id: number): Promise<Match | null> => {
    const [rows] = await pool.query('SELECT * FROM matches WHERE id = ?', [id]);
    const matches = rows as Match[];
    return matches.length > 0 ? matches[0] : null;
};

export const createMatch = async (match: Match): Promise<number> => {
    const { section_id, score, team_id, date } = match;
    const [result] = await pool.execute(
        'INSERT INTO matches (section_id, score, team_id, date) VALUES (?, ?, ?, ?)',
        [section_id, score, team_id, date]
    );
    const insertResult = result as mysql.ResultSetHeader;
    return insertResult.insertId;
};

export const updateMatch = async (id: number, match: Partial<Match>): Promise<boolean> => {
    const fields = [];
    const values: any[] = [];

    for (const key in match) {
        if (match[key as keyof Match] !== undefined) {
            fields.push(`${key} = ?`);
            values.push(match[key as keyof Match]);
        }
    }

    if (fields.length === 0) return false;

    values.push(id);

    const [result] = await pool.execute(
        `UPDATE matches SET ${fields.join(', ')} WHERE id = ?`,
        values
    );

    const updateResult = result as mysql.ResultSetHeader;
    return updateResult.affectedRows > 0;
};

export const deleteMatch = async (id: number): Promise<boolean> => {
    const [result] = await pool.execute('DELETE FROM matches WHERE id = ?', [id]);
    const deleteResult = result as mysql.ResultSetHeader;
    return deleteResult.affectedRows > 0;
};
