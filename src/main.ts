import express, { Application, Request, Response } from "express";
import { calendarData } from "./utils";
import { Card } from "./GraphCards";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send(`<h1>Project is up and Running with TypeScript</h1>`);
});

app.get("/:user", (req: Request, res: Response) => {
  let user: string = req.params.user;
  calendarData(`${user}`).then((data: number[]) => {
    const graph = new Card(
      400,
      800,
      { bgColor: "#ffffff", color: "#ffffff" },
      "Ashutosh Dwivedi's Contribution Graph"
    );
    graph.chart(data).then((chart: any) => {
      res.send(chart);
    });
  });
});

app.listen(7000, () => {
  console.log("Server is Running in port 7000");
});
