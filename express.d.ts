import { Request } from "express";

type UserContext = {
  email?: string;
};

declare global {
  namespace Express {
    interface Request {
      ctx?: UserContext;
    }
  }
}
