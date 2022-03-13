import { Request, Response } from 'express';
import { Card } from './GraphCards';
import { invalidUserSvg } from './svgs';
import { Fetcher } from './fetcher';
import { selectColors } from './styles/themes';
import { queryOption, ParsedQs } from './interfaces/interface';

export const queryOptions = (queryString: ParsedQs): queryOption => {
  let area = false;
  const theme: string = queryString.theme || 'default';

  if (String(queryString.area) === 'true') {
    area = true;
  }

  // Custom options for user
  const colors = {
    areaColor: queryString.area_color
      ? queryString.area_color
      : selectColors(theme).areaColor,
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
    hide_title: String(queryString.hide_title) === 'true' ? true : false,
    colors: colors,
    area: area,
  };

  if (queryString.custom_title)
    options['custom_title'] = String(queryString.custom_title);

  return options;
};

const setHttpHeader = (res: Response, directivesAndAge: string): void => {
  res.setHeader('Cache-Control', `${directivesAndAge}`);
  res.set('Content-Type', 'image/svg+xml');
};

export const getGraph = async (req: Request, res: Response) => {
  try {
    const options: queryOption = queryOptions(req.query);

    const fetcher = new Fetcher(options.username);
    const fetchCalendarData = await fetcher.fetchContributions();

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
