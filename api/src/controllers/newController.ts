// src/controllers/matchController.ts
import { Request, Response } from 'express';
import {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNew
} from '../services/newsServices.js';
import News from '../models/News.js';

export const fetchAllNews = async (req: Request, res: Response) => {
    try {
        const news = await getAllNews();
        if (news.length === 0) {
            return res.status(404).json({ message: 'No news found' });
        }
        res.status(200).json(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const fetchNewsById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid New ID' });
        }

        const match = await getNewsById(id);
        if (!match) {
            return res.status(404).json({ message: 'New not found' });
        }

        res.status(200).json(match);
    } catch (error) {
        console.error('Error fetching new:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addNew = async (req: Request, res: Response) => {
    try {
        const news: News = req.body;

        if (!news.title || !news.resume || !news.description || !news.image || news.created_at || news.edit_at) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const insertId = await createNews(news);
        res.status(201).json({ insertId, ...news });
    } catch (error) {
        console.error('Error creating new:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const modifyNew = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const newsUpdates: Partial<News> = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid New ID' });
        }

        const success = await updateNews(id, newsUpdates);
        if (!success) {
            return res.status(404).json({ message: 'New not found or no changes made' });
        }

        const updatedNew = await getNewsById(id);
        res.status(200).json(updatedNew);
    } catch (error) {
        console.error('Error updating new:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removeNew = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid New ID' });
        }

        const success = await deleteNew(id);
        if (!success) {
            return res.status(404).json({ message: 'New not found' });
        }

        res.status(200).json({ message: 'New deleted successfully' });
    } catch (error) {
        console.error('Error deleting match:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};