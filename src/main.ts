import express, { Application, Request, Response } from 'express';
import { getGraph } from './utils';
import bodyParser from 'body-parser';

const app: Application = express();
let port: string | number = process.env.PORT || 5100;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>GitHub Readme Activity Graph 📈</h1>`);
});

//Get Graph
app.get('/graph', getGraph);

app.listen(port, (): void => {
  console.log(`Server is Running in port ${port}`);
});
