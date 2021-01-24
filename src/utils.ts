import { Request, Response } from 'express';
import { Card } from './GraphCards';
import { invalidUserSvg } from './svgs';
import {
  queryOption,
  colors,
  ParsedQs,
  userDetails,
} from '../interfaces/interface';
import { responseGraph } from '../types/types';
import { fetchContributions } from './fetching';
import { selectColors } from '../styles/themes';

export const queryOptions = (queryString: ParsedQs): queryOption => {
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

const setHttpHeader = (res: Response, directivesAndAge: string): void => {
  res.setHeader('Cache-Control', `${directivesAndAge}`);
  res.set('Content-Type', 'image/svg+xml');
};

export const getGraph: responseGraph = async (req: Request, res: Response) => {
  try {
    const options: queryOption = queryOptions(req.query);

    const fetchCalendarData: userDetails | string = await fetchContributions(
      `${options.username}`
    );

    if (typeof fetchCalendarData === 'object') {
      const graph: Card = new Card(
        420,
        1200,
        options.colors,
        `${fetchCalendarData.name}'s Contribution Graph`,
        options.area
      );

      const getChart: string = await graph.chart(
        fetchCalendarData.contributions
      );

      setHttpHeader(res, 'public, max-age=1800');
      res.status(200).send(getChart);
    } else {
      setHttpHeader(res, 'no-store, max-age=0');
      res.send(invalidUserSvg(fetchCalendarData));
    }
  } catch (error) {
    setHttpHeader(res, 'no-store, max-age=0');
    res.send(invalidUserSvg('Something unexpected happened 💥'));
  }
};
