import express, { Request, Response } from 'express';
import matchRoutes from './routes/matchRoutes.js';
import pool from './utils/db.js';
const app = express();

const port = 5000;

app.use(express.json());

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!');
});

(async () => {
    try {
        console.log('Tentative de connexion à la base de données...');
        await pool.getConnection();
        console.log('Connecté à la base de données MySQL');

        app.listen(port, () => {
            console.log(`Express is listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Erreur de connexion à la base de données:', error);
        process.exit(1);
    }
})();

app.use('/api/matches', matchRoutes);