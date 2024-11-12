import { Request, Response } from 'express';
import { getClub, updateClub } from '../services/clubServices.js';
import Club from '../models/Club.js';

export const fetchClub = async (req: Request, res: Response) => {
    try {
        const clubs = await getClub();
        if (clubs.length === 0) {
            return res.status(404).json({ message: 'No club found' });
        }
        res.status(200).json(clubs);
    } catch (error) {
        console.error('Error fetching club:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const modifyClub = async (req: Request, res: Response) => {
    try {
        const clubUpdates: Partial<Club> = req.body;

        const success = await updateClub(clubUpdates);

        if (!success) {
            return res.status(404).json({ message: 'Club not found or no changes made' });
        }

        const updatedClub = await getClub();
        
        res.status(200).json(updatedClub);
    } catch (error) {
        console.error('Error updating club:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};