import express, { Request, Response } from 'express';
import verifyToken from './middleware/verifyToken.js';
const app = express();

const port = 5000;

app.use(express.json());

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});