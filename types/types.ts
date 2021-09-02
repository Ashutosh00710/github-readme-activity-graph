import { Request, Response } from 'express';
import { AxiosResponse } from 'axios';
import { query, responseOfApi, userDetails } from '../interfaces/interface';

//Addition type declaration for function expressions
export type responseGraph = (req: Request, res: Response) => Promise<void>;
export type gqlQuery = (username: string) => query;
export type fetcher = (data: query) => Promise<AxiosResponse<responseOfApi>>;
export type fetchContribution = (
  username: string,
  graphqlQuery: gqlQuery,
  fetch: fetcher
) => Promise<userDetails | string>;
