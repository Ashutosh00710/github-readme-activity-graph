import express, { Application, Request, Response } from 'express';
import { calendarData, queryOptions } from './utils';
import { Card } from './GraphCards';
import bodyParser from 'body-parser';
import { invalidUserSvg } from './svgs';
import { queryOption } from '../interfaces/interface';
import axios from 'axios';

const app: Application = express();
let port: string | number = process.env.PORT || 5100;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>GitHub Readme Activity Graph 📈</h1>`);
});

app.get(
  '/graph',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const options: queryOption = queryOptions(req.query);

      const fetchCalendarData: string | number[] = await calendarData(
        `${options.username}`,
        axios //Dependency Injection
      );

      if (Array.isArray(fetchCalendarData)) {
        const graph: Card = new Card(
          420,
          800,
          options.colors,
          `${options.username}'s Contribution Graph`,
          options.area
        );

        const getChart: string = await graph.chart(fetchCalendarData);

        res.setHeader('Cache-Control', 'public, max-age=900');
        res.set('Content-Type', 'image/svg+xml');
        res.status(200).send(getChart);
      } else {
        res.set('Content-Type', 'image/svg+xml');
        res.send(invalidUserSvg(fetchCalendarData));
      }
    } catch (error) {
      res.send(invalidUserSvg('Something unexpected happened 💥'));
    }
  }
);

app.listen(port, (): void => {
  console.log(`Server is Running in port ${port}`);
});
