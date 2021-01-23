import { Request, Response } from 'express';

export type responseGraph = (req: Request, res: Response) => Promise<void>;
