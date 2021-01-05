import express, { Application, Request, Response } from "express";
import { calendarData, selectColors } from "./utils";
import { Card } from "./GraphCards";
import { colors } from "../interfaces/interface";
import bodyParser from "body-parser";
import { themes } from "../styles/themes";
import { invalidUserSvg } from "./svgs";

const app: Application = express();
let port: string | number = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`<h1>Project is up and Running with TypeScript</h1>`);
});

app.get("/graph", (req: Request, res: Response): void => {
  let username: string = String(req.query.username);
  let colors: colors;
  let area: boolean;

  if (String(req.query.area) === "true") {
    area = true;
  } else {
    area = false;
  }

  if (String(req.query.theme) in themes) {
    colors = selectColors(String(req.query.theme));
  } else {
    colors = selectColors("default");
  }

  calendarData(`${username}`).then((data: number[] | string): void => {
    if (Array.isArray(data)) {
      const graph: Card = new Card(
        400,
        800,
        colors,
        `${username}'s Contribution Graph`,
        area
      );
      graph
        .chart(data)
        .then((chart: string) => {
          res.setHeader("Cache-Control", "public, max-age=900");
          res.set("Content-Type", "image/svg+xml");
          res.status(200).send(chart);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      res.set("Content-Type", "image/svg+xml");
      res.send(invalidUserSvg(data));
    }
  });
});

app.listen(port, (): void => {
  console.log(`Server is Running in port ${port}`);
});
