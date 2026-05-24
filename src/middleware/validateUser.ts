import type { Request, Response, NextFunction } from "express";
import { USER_ROLE } from "../types/index";
import type { ROLES } from "../types/index";

const userRoles = Object.values(USER_ROLE) as ROLES[];

const validateUserRole = (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.body;

  if (role && !userRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Role must be contributor or maintainer",
    });
  }

  next();
};

export default validateUserRole;
