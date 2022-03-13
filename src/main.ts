import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { Utilities } from './utils';
import { Fetcher } from './fetcher';
import { invalidUserSvg } from './svgs';

const app: Application = express();
const port = process.env.PORT || 5100;

app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send(`<h1>GitHub Readme Activity Graph 📈</h1>`);
});

//Get Graph
app.get('/graph', async (req: Request, res: Response) => {
  try {
    const utils = new Utilities(req.query);

    const fetcher = new Fetcher(utils.username);
    const fetchCalendarData = await fetcher.fetchContributions();

    const { finalGraph, header } = await utils.buildGraph(fetchCalendarData);
    utils.setHttpHeader(res, header.maxAge);

    res.status(200).send(finalGraph);
  } catch (error) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.set('Content-Type', 'image/svg+xml');
    res.send(invalidUserSvg('Something unexpected happened 💥'));
  }
});

app.listen(port, (): void => {
  console.log(`Server is Running on Port ${port}`);
});
