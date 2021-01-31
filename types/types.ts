import { Request, Response } from 'express';
import { query, responseOfApi } from '../interfaces/interface';
import { AxiosResponse } from 'axios';

//Addition type declaration for function expressions
export type responseGraph = (req: Request, res: Response) => Promise<void>;
export type gqlQuery = (username: string) => query;
export type fetcher = (data: query) => Promise<AxiosResponse<responseOfApi>>;
