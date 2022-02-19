import { Request, Response } from 'express';
import { Card } from './GraphCards';
import { invalidUserSvg } from './svgs';
import { fetchContributions } from './fetcher';
import { selectColors } from '../styles/themes';
import {
  queryOption,
  ParsedQs,
  userDetails,
  ParsedQsPCS,
  pcsType,
} from '../interfaces/interface';
import { fetcher, gqlQuery } from '../types/types';

export const queryOptions = (queryString: ParsedQs): queryOption => {
  let area = false;
  const theme: string = queryString.theme || 'default';

  if (String(queryString.area) === 'true') {
    area = true;
  }

  const getColors = (query: ParsedQs | ParsedQsPCS) => ({
    areaColor: query.area_color
      ? query.area_color
      : selectColors(theme).areaColor,
    bgColor: query.bg_color ? query.bg_color : selectColors(theme).bgColor,
    borderColor:
      String(query.hide_border) === 'true'
        ? '0000' // transparent
        : selectColors(theme).borderColor,
    color: query.color ? query.color : selectColors(theme).color,
    lineColor: query.line ? query.line : selectColors(theme).lineColor,
    pointColor: query.point ? query.point : selectColors(theme).pointColor,
  });

  // Custom options for user
  const colors = getColors(queryString);

  // Custom prefers color scheme options for user
  const pcs: pcsType = {};

  if (queryString?.pcs_light) pcs.light = getColors(queryString.pcs_light);
  if (queryString?.pcs_dark) pcs.dark = getColors(queryString.pcs_dark);

  const options: queryOption = {
    username: String(queryString.username),
    hide_title: String(queryString.hide_title) === 'true' ? true : false,
    colors: colors,
    area: area,
    pcs: pcs,
  };

  if (queryString.custom_title)
    options['custom_title'] = String(queryString.custom_title);

  return options;
};

const setHttpHeader = (res: Response, directivesAndAge: string): void => {
  res.setHeader('Cache-Control', `${directivesAndAge}`);
  res.set('Content-Type', 'image/svg+xml');
};

//HOF
export const getGraph =
  (graphqlQuery: gqlQuery, fetch: fetcher) =>
  async (req: Request, res: Response) => {
    try {
      const options: queryOption = queryOptions(req.query);

      const fetchCalendarData: userDetails | string = await fetchContributions(
        `${options.username}`,
        graphqlQuery,
        fetch
      );

      if (typeof fetchCalendarData === 'object') {
        let title = '';

        if (!options.hide_title) {
          if (options.custom_title) {
            title = options.custom_title;
          } else {
            title = `${
              fetchCalendarData.name !== null
                ? fetchCalendarData.name
                : options.username
            }'s Contribution Graph`;
          }
        }

        const graph: Card = new Card(
          420,
          1200,
          options.colors,
          title,
          options.area,
          options.pcs
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
      console.log(error);
      setHttpHeader(res, 'no-store, max-age=0');
      res.send(invalidUserSvg('Something unexpected happened 💥'));
    }
  };

/* DO NOT CHANGE THE CODE BELOW */
export const getData =
  (graphqlQuery: gqlQuery, fetch: fetcher) =>
  async (req: Request, res: Response) => {
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
      console.log(error);
      res.send(invalidUserSvg('Something unexpected happened 💥'));
    }
  };
