import pool from '../utils/db.js';
import Sections from '../models/Sections.js';
import mysql, { RowDataPacket } from 'mysql2/promise';

export const getAllSections = async (): Promise<Sections[]> => {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM sections;`);
    return rows as Sections[];
};