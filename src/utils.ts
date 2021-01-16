import { Request, Response } from 'express';
import { Card } from './GraphCards';
import { invalidUserSvg } from './svgs';
import axios, { AxiosResponse, AxiosStatic } from 'axios';
import { queryOption, colors, resp } from '../interfaces/interface';
import { selectColors } from '../styles/themes';

const calendarData = async (
  userId: string,
  axios: AxiosStatic
): Promise<number[] | string> => {
  try {
    let apiResponse: AxiosResponse<resp> = await axios(
      `http://github-calendar.herokuapp.com/commits/last/${userId}`
    );
    return apiResponse.data.data.length
      ? apiResponse.data.data
      : `Can't fetch any contribution. Please check your username 😬`;
  } catch (err) {
    return err;
  }
};

const queryOptions = (queryString: any): queryOption => {
  let area: boolean = false;
  let colors: colors;
  if (String(queryString.area) === 'true') {
    area = true;
  }

  if (queryString.theme) {
    colors = selectColors(queryString.theme as string);
  } else {
    //Custom options for user
    colors = {
      bgColor: queryString.bg_color
        ? (queryString.bg_color as string)
        : selectColors('default').bgColor,
      color: queryString.color
        ? (queryString.color as string)
        : selectColors('default').color,
      lineColor: queryString.line
        ? (queryString.line as string)
        : selectColors('default').lineColor,
      pointColor: queryString.point
        ? (queryString.point as string)
        : selectColors('default').pointColor,
    };
  }

  const options: queryOption = {
    username: String(queryString.username),
    colors: colors,
    area: area,
  };

  return options;
};

export const getGraph = async (req: Request, res: Response): Promise<void> => {
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
};
