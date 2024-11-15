import { Request, Response } from 'express';
import { getAllTeams } from '../services/teamServices.js';

export const fetchAllTeams = async (req: Request, res: Response) => {
    try {
        const teams = await getAllTeams();
        if (teams.length === 0) {
            return res.status(404).json({ message: 'No teams found' });
        }
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};