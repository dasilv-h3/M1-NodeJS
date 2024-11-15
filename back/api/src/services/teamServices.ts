import pool from '../utils/db.js';
import Teams from '../models/Teams.js';
import mysql, { RowDataPacket } from 'mysql2/promise';

export const getAllTeams = async (): Promise<Teams[]> => {
    const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT
        teams.id,
        teams.name
        FROM teams
        ORDER BY id ASC;`);
    return rows as Teams[];
};