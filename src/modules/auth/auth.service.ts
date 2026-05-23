import { error } from "node:console";
import { pool } from "../../db";
import type { IUser } from "../user/user.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users (name,email,password,role) 
    VALUES ($1,$2,$3,coalesce($4,'contributor')) 
    RETURNING *`,
    [name, email, hashedPassword, role],
  );
  delete result.rows[0].password;
  return result;
};

const logInUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  // check if the user exists
  // compare pass
  // generate jwt

  const UserData = await pool.query(
    `
    select * from users where email=$1
    
    `,
    [email],
  );
  if (UserData.rows.length === 0) {
    throw new Error("User not registered!!");
  }

  const user = UserData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Password not matched!!");
  }

  // generate jwt token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: "1d",
  });

  delete user.password;
  return { accessToken, user };
};

export const authService = {
  createUserIntoDB,
  logInUserIntoDB,
};
