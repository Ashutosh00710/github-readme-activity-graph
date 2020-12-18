import express, { Application, Request, Response } from "express";
import { calendarData } from "./utils";
import { Card } from "./GraphCards";
const cors = require("cors");

const app: Application = express();
let port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send(`<h1>Project is up and Running with TypeScript</h1>`);
});

app.get("/:user", (req: Request, res: Response): void => {
  let user: string = req.params.user;
  calendarData(`${user}`).then((data: number[] | string ) => {
    if(Array.isArray(data)){
    const graph = new Card(
      500,
      800,
      { bgColor: "#ffffff", color: "#ffffff" },
      `${user.toUpperCase()}'s Contrinution Graph`
    );
    graph
      .chart(data)
      .then((chart: string) => {
        res.set("Content-Type", "image/svg+xml");
        res.status(200).send(chart);
      })
      .catch((err) => {
        console.error(err);
      });
    }
    else {
      res.send(`<h2>${data}</h2>`);
    }
  });
});

app.listen(port, (): void => {
  console.log(`Server is Running in port ${port}`);
});
