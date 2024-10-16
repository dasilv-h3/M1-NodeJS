// src/controllers/matchController.ts
import { Request, Response } from 'express';
import {
    getAllSponsors,
    getSponsorsById,
    createSponsors,
    updateSponsors,
    deleteSponsors
} from '../services/sponsorsServices.js';
import Sponsors from '../models/Sponsors.js';

export const fetchAllSponsors = async (req: Request, res: Response) => {
    try {
        const sponsos = await getAllSponsors();
        if (sponsos.length === 0) {
            return res.status(404).json({ message: 'No sponsors found' });
        }
        res.status(200).json(sponsos);
    } catch (error) {
        console.error('Error fetching sponsors:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const fetchSponsorsById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Sponsors ID' });
        }

        const sponso = await getSponsorsById(id);
        if (!sponso) {
            return res.status(404).json({ message: 'New not found' });
        }

        res.status(200).json(sponso);
    } catch (error) {
        console.error('Error fetching sponsors:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addSponsors = async (req: Request, res: Response) => {
    try {
        const sponsos: Sponsors = req.body;

        if (!sponsos.logo || !sponsos.url) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const insertId = await createSponsors(sponsos);
        res.status(201).json({ insertId, ...sponsos });
    } catch (error) {
        console.error('Error creating sponsors:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const modifySponsors = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const sponsorsUpdates: Partial<Sponsors> = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid New ID' });
        }

        const success = await updateSponsors(id, sponsorsUpdates);
        if (!success) {
            return res.status(404).json({ message: 'Sponsors not found or no changes made' });
        }

        const updatedSponsors = await getSponsorsById(id);
        res.status(200).json(updatedSponsors);
    } catch (error) {
        console.error('Error updating sponsors:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removeSponsors = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Sponsors ID' });
        }

        const success = await deleteSponsors(id);
        if (!success) {
            return res.status(404).json({ message: 'Sponsors not found' });
        }

        res.status(200).json({ message: 'Sponsors deleted successfully' });
    } catch (error) {
        console.error('Error deleting Sponsors:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};