import { pool } from "../../db";
import type { IUser } from "./auth.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const result = await pool.query(
    `INSERT INTO users (name,email,password,role) 
    VALUES ($1,$2,$3,coalesce($4,'contributor')) 
    RETURNING *`,
    [name, email, password, role],
  );
  delete result.rows[0].password;
  return result;
};

const logInUserIntoDB = async (payload: any) => {};

export const authService = {
  createUserIntoDB,
  logInUserIntoDB,
};
