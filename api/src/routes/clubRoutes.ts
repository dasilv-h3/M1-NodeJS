import { Router } from 'express';
import {
    fetchClub,
    modifyClub,
} from '../controllers/clubController.js';

const router = Router();

router.get('/', fetchClub);

router.put('/:id', modifyClub);


export default router;