import type { Request, Response, NextFunction } from "express";
import { ISSUE_TYPE, ISSUE_STATUS } from "../types/index";
import type { IssueType, IssueStatus } from "../types/index";

const validatIssue = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, type, status } = req.body;

  const issueTypes = Object.values(ISSUE_TYPE) as IssueType[];
  const issueStatuses = Object.values(ISSUE_STATUS) as IssueStatus[];

  if (title.length > 150) {
    return res.status(400).json({
      success: false,
      message: "Title must be in 150 charecters",
    });
  }

  if (description.length < 20) {
    return res.status(400).json({
      success: false,
      message: "description at least 20 charecters",
    });
  }

  if (!issueTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      message: "Type must be bug or freature_request matched.",
    });
  }

  if (status && !issueStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status category not matched",
    });
  }

  next();
};

export default validatIssue;
