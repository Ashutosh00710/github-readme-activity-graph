import { Request, Response } from 'express';
import { Card } from './GraphCards';
import { invalidUserSvg } from './svgs';
import {
  queryOption,
  colors,
  ParsedQs,
  userDetails,
} from '../interfaces/interface';
import { fetcher, gqlQuery } from '../types/types';
import { fetchContributions } from './fetcher';
import { selectColors } from '../styles/themes';

export const queryOptions = (queryString: ParsedQs): queryOption => {
  let area: boolean = false;
  let colors: colors;
  let theme: string = queryString.theme || 'default';

  if (String(queryString.area) === 'true') {
    area = true;
  }

  // Custom options for user
  colors = {
    bgColor: queryString.bg_color
      ? queryString.bg_color
      : selectColors(theme).bgColor,
    borderColor:
      String(queryString.hide_border) === 'true'
        ? '0000' // transparent
        : selectColors(theme).borderColor,
    color: queryString.color ? queryString.color : selectColors(theme).color,
    lineColor: queryString.line
      ? queryString.line
      : selectColors(theme).lineColor,
    pointColor: queryString.point
      ? queryString.point
      : selectColors(theme).pointColor,
  };

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

//HOF
export const getGraph = (graphqlQuery: gqlQuery, fetch: fetcher) => async (
  req: Request,
  res: Response
) => {
  try {
    const options: queryOption = queryOptions(req.query);

    const fetchCalendarData: userDetails | string = await fetchContributions(
      `${options.username}`,
      graphqlQuery,
      fetch
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

/* DO NOT CHANGE THE CODE BELOW */
export const getData = (graphqlQuery: gqlQuery, fetch: fetcher) => async (
  req: Request,
  res: Response
) => {
  try {
    const options: queryOption = queryOptions(req.query);

    const fetchCalendarData: userDetails | string = await fetchContributions(
      `${options.username}`,
      graphqlQuery,
      fetch
    );

    if (typeof fetchCalendarData === 'object') {
      res.status(200).send(fetchCalendarData);
    } else {
      res.send(invalidUserSvg(fetchCalendarData));
    }
  } catch (error) {
    res.send(invalidUserSvg('Something unexpected happened 💥'));
  }
};
