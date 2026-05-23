import { get } from "node:http";
import { pool } from "../../db";
import type { Iissue } from "./issues.interface";
import type { JwtPayload } from "jsonwebtoken";

const createIssuesIntoDB = async (payload: Iissue, rep_id: number) => {
  const { title, description, type, status } = payload;
  const reporter_id = rep_id;

  const result = await pool.query(
    `
        insert into issues(title, description, type,status, reporter_id)
        values($1,$2,$3,coalesce($4,'open'),$5) returning *
        `,
    [title, description, type, status, reporter_id],
  );
  return result;
};

const getSortedIssuesFromDB = async (payload: any) => {};

const getSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
      select * from issues where id=$1
    `,
    [id],
  );

  return result;
};

const updateIssuesIntoDB = async (payload: Iissue, id: string) => {
  const { title, description, type, status } = payload;

  const result = await pool.query(
    `
     update issues set
      title = coalesce($1, title),
      description = coalesce($2, description),
      type = coalesce($3, type),
      status = coalesce($4, status),
      updated_at = now()
      where id = $5
      returning *
    `,
    [title, description, type, status, id],
  );

  return result;
};

const deleteIssuesFromDB = async (id: string) => {
  const result = await pool.query(
    `
      delete from issues where id = $1
      returning *
    `,
    [id],
  );

  return result;
};

export const issuesService = {
  createIssuesIntoDB,
  getSortedIssuesFromDB,
  getSingleIssueFromDB,
  updateIssuesIntoDB,
  deleteIssuesFromDB,
};
