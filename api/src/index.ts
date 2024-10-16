import express, { Request, Response } from 'express';
import matchRoutes from './routes/matchRoutes.js';
import pool from './utils/db.js';
const app = express();

const port = 5000;

app.use(express.json());

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});

app.use('/api/matches', matchRoutes);