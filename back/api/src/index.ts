import express from 'express';
import cors from 'cors';
import matchRoutes from './routes/matchRoutes.js';
import newRoutes from './routes/newRoutes.js';
import sponsorRoutes from './routes/sponsorRoutes.js';
import authRoutes from './routes/authRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import teamsRoutes from './routes/teamsRoute.js';
import sectionsRoutes from './routes/sectionsRoutes.js';
import path from 'path';

const app = express();
const port = 5000;

app.use(cors(
    {
        // origin: 'http://localhost:3001', // Remplacez par votre domaine front-end
        credentials: true, // Si vous avez besoin de cookies ou d'authentification
    }),
    express.json()
);


app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});

app.use('/api/matches', matchRoutes);
app.use('/api/news', newRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/users', authRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/sections', sectionsRoutes);

app.use('/uploads/sponsors', express.static(path.resolve('uploads/sponsors')));
