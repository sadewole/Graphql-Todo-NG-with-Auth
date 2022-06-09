import { Request } from 'express';

export interface MyContext {
  req: Request;
}

declare module 'express-session' {
  interface Session {
    userId?: string;
  }
}
