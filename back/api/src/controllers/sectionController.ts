import { Request, Response } from 'express';
import { getAllSections } from '../services/sectionServices.js';

export const fetchAllSections = async (req: Request, res: Response) => {
    try {
        const teams = await getAllSections();
        if (teams.length === 0) {
            return res.status(404).json({ message: 'No sections found' });
        }
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error fetching sections:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};