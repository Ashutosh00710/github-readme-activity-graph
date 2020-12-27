import express, { Application, Request, Response } from "express";
import { calendarData } from "./utils";
import { Card } from "./GraphCards";
import bodyParser from "body-parser";
import { defaultColors } from "../styles/defaults";

const app: Application = express();
let port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`<h1>Project is up and Running with TypeScript</h1>`);
});

app.get("/graph", (req: Request, res: Response): void => {
  let username = req.query.username;
  let bgColor = req.query.bg_color ? req.query.bg_color : defaultColors.bgColor;
  let color = req.query.color ? req.query.color : defaultColors.color;
  let lineColor = req.query.line ? req.query.line : defaultColors.lineColor;
  let pointColor = req.query.point ? req.query.point : defaultColors.pointColor;

  calendarData(`${username}`).then((data: number[] | string) => {
    if (Array.isArray(data)) {
      const graph = new Card(
        500,
        800,
        {
          bgColor: `${bgColor}`,
          color: `${color}`,
          line: `${lineColor}`,
          point: `${pointColor}`,
        },
        `${username}'s Contrinution Graph`
      );
      graph
        .chart(data)
        .then((chart: string) => {
          res.setHeader("Cache-Control", "public, max-age=900"); // 15 minutes
          res.set("Content-Type", "image/svg+xml");
          res.status(200).send(chart);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      res.send(`<h2>${data}</h2>`);
    }
  });
});

app.listen(port, (): void => {
  console.log(`Server is Running in port ${port}`);
});
