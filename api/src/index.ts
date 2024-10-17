import express from 'express';
import matchRoutes from './routes/matchRoutes.js';
import newRoutes from './routes/newRoutes.js';
import sponsorRoutes from './routes/sponsorRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
const app = express();

const port = 5000;

app.use(express.json());


app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});

app.use('/api/matches', matchRoutes);
app.use('/api/news', newRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/club', clubRoutes);
