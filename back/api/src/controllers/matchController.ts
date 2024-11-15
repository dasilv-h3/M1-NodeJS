import { Request, Response } from 'express';
import {
    getAllMatches,
    getMatchById,
    createMatch,
    updateMatch,
    deleteMatch,
    getPreviousMatches,
    getNextMatches,
    getAllMatchesMasculinJunior
} from '../services/matchServices.js';
import Match from '../models/Matches.js';

export const fetchAllMatches = async (req: Request, res: Response) => {
    try {
        const matches = await getAllMatches();
        if (matches.length === 0) {
            return res.status(404).json({ message: 'No matches found' });
        }
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const fetchPreviousMatches = async (req: Request, res: Response) => {
    try {
        const matches = await getPreviousMatches();
        if (matches.length === 0) {
            return res.status(404).json({ message: 'No matches found' });
        }
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const fetchNextMatches = async (req: Request, res: Response) => {
    try {
        const matches = await getNextMatches();
        if (matches.length === 0) {
            return res.status(404).json({ message: 'No matches found' });
        }
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const fetchMatchById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Match ID' });
        }

        const match = await getMatchById(id);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        res.status(200).json(match);
    } catch (error) {
        console.error('Error fetching match:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addMatch = async (req: Request, res: Response) => {
    
    try {
        const match: Match = req.body;

        if (!match.section_id || !match.score || !match.opponent_id || !match.date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const insertId = await createMatch(match);
        res.status(201).json({ insertId, ...match });
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const modifyMatch = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const matchUpdates: Partial<Match> = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Match ID' });
        }

        const success = await updateMatch(id, matchUpdates);
        if (!success) {
            return res.status(404).json({ message: 'Match not found or no changes made' });
        }

        const updatedMatch = await getMatchById(id);
        res.status(200).json(updatedMatch);
    } catch (error) {
        console.error('Error updating match:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removeMatch = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Match ID' });
        }

        const success = await deleteMatch(id);
        if (!success) {
            return res.status(404).json({ message: 'Match not found' });
        }

        res.status(200).json({ message: 'Match deleted successfully' });
    } catch (error) {
        console.error('Error deleting match:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const fetchAllMatchesMasculinJunior = async (req: Request, res: Response) => {
    const matches = await getAllMatchesMasculinJunior();
    console.log('matches masculin junior:', matches);
    try {
       
        
        if (matches.length === 0) {
            return res.status(404).json({ message: 'No matches found' });
        }
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};