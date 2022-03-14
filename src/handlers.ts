import { Utilities } from './utils';
import { Request, Response } from 'express';
import { Fetcher } from './fetcher';
import { invalidUserSvg } from './svgs';

export class Handlers {
    public getRoot(_req: Request, res: Response) {
        res.send(`<h1>GitHub Readme Activity Graph 📈</h1>`);
    }

    public async getGraph(req: Request, res: Response) {
        try {
            const utils = new Utilities(req.query);

            const fetcher = new Fetcher(utils.username);
            const fetchCalendarData = await fetcher.fetchContributions();

            const { finalGraph, header } = await utils.buildGraph(fetchCalendarData);
            utils.setHttpHeader(res, header.maxAge);

            res.status(200).send(finalGraph);
        } catch (error) {
            res.setHeader('Cache-Control', 'no-store, max-age=0');
            res.set('Content-Type', 'image/svg+xml');
            res.send(invalidUserSvg('Something unexpected happened 💥'));
        }
    }
}
