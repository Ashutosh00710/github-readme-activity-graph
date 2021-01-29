import { Request, Response } from 'express';
import { query, responseOfApi } from '../interfaces/interface';
import { AxiosResponse } from 'axios';

export type responseGraph = (req: Request, res: Response) => Promise<void>;
export type fetcher = (data: query) => Promise<AxiosResponse<responseOfApi>>;
