import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";

const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // token is not null
      // varify token
      // get user info from token payload
      // check the user role type from payload

      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });

        const decoded = jwt.verify(
          token as string,
          config.jwt_secret as string,
        ) as JwtPayload;

        const userData = await pool.query(
          `
            select * from users where email=$1
            `,
          [decoded.email],
        );

        if (userData.rows.length === 0) {
          res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
        const user = userData.rows[0];

        if (roles.length && !roles.includes(user.role)) {
          res.status(401).json({
            success: false,
            message: "Forbidden",
          });
        }

        //req.user = decoded;
        next();
      }
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
