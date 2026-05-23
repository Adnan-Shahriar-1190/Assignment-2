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

const getSortedIssuesFromDB = async (query: any) => {
  const { sort = "newest", type, status } = query;

  const orderBy = sort === "oldest" ? "asc" : "desc";

  const issuesResult = await pool.query(
    `
      select *
      from issues
      where type = coalesce($1, type)
      and status = coalesce($2, status)
      order by created_at ${orderBy}
    `,
    [type, status],
  );

  const issues = issuesResult.rows;

  const result = [];

  for (const issue of issues) {
    const reporterResult = await pool.query(
      `
        select id, name, role
        from users
        where id = $1
      `,
      [issue.reporter_id],
    );

    const reporter = reporterResult.rows[0];

    result.push({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: reporter
        ? {
            id: reporter.id,
            name: reporter.name,
            role: reporter.role,
          }
        : null,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    });
  }

  return result;
};

const getSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
      select * from issues where id=$1
    `,
    [id],
  );

  return result;
};

const updateIssuesIntoDB = async (
  payload: Iissue,
  id: string,
  user: JwtPayload,
) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
      update issues set
        title = coalesce($1, title),
        description = coalesce($2, description),
        type = coalesce($3, type),
        updated_at = now()
      where id = $4
      and (
        $5 = 'maintainer'
        or (
          $5 = 'contributor'
          and reporter_id = $6
          and status = 'open'
        )
      )
      returning *
    `,
    [title, description, type, id, user.role, user.id],
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
