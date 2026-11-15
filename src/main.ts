import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import { Handlers } from './handlers';

// Load TOKEN from .env when running on Node (the Cloudflare Worker uses src/worker.ts instead)
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5100;

app.use(express.urlencoded({ extended: false }));
app.use(cors());

const handlers = new Handlers();

app.get('/', handlers.getRoot);
//Get Graph
app.get('/graph', handlers.getGraph);

app.get('/data', handlers.getData);

app.listen(port, (): void => {
    console.log(`Server is Running on Port ${port}`);
});
