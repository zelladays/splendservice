import { Request } from "express";

type UserContext = {
  userId?: string;
  userEmail?: string;
  userRole?: "SUPER_ADMIN" | "ADMIN" | "USER";
};

declare global {
  namespace Express {
    interface Request {
      userContext?: UserContext;
    }
  }
}
