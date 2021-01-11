import express, { Application, Request, Response } from 'express';
import { calendarData, queryOptions } from './utils';
import { Card } from './GraphCards';
import bodyParser from 'body-parser';
import { invalidUserSvg } from './svgs';
import { queryOption } from '../interfaces/interface';

const app: Application = express();
let port: string | number = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>GitHub Readme Activity Graph 📈</h1>`);
});

app.get('/graph', (req: Request, res: Response): void => {
  const options: queryOption = queryOptions(req.query);

  calendarData(`${options.username}`).then((data: number[] | string): void => {
    if (Array.isArray(data)) {
      const graph: Card = new Card(
        420,
        800,
        options.colors,
        `${options.username}'s Contribution Graph`,
        options.area
      );
      graph
        .chart(data)
        .then((chart: string) => {
          res.setHeader('Cache-Control', 'public, max-age=900');
          res.set('Content-Type', 'image/svg+xml');
          res.status(200).send(chart);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      res.set('Content-Type', 'image/svg+xml');
      res.send(invalidUserSvg(data));
    }
  });
});

app.listen(port, (): void => {
  console.log(`Server is Running in port ${port}`);
});
