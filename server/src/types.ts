import session from "express-session";
import { Request, Response } from "express";

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

export type MyContext = {
  req: Request & { session: session.SessionData };
  res: Response;
};

export type myReq = Request & { session: session.SessionData };

export type myRes = Response;
