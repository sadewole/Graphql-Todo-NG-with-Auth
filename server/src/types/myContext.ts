import { Request, Response } from 'express';
import { createUserLoader } from 'src/utils/createUserLoader';

export interface MyContext {
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
}

declare module 'express-session' {
  interface Session {
    userId?: string;
  }
}
