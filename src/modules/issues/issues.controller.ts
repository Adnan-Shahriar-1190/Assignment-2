import { type Request, type Response } from "express";
import { issuesService } from "./issues.service";
import type { JwtPayload } from "jsonwebtoken";

const createIssues = async (req: Request, res: Response) => {
  try {
    const reporter_id = req.user.id;
    const result = await issuesService.createIssuesIntoDB(
      req.body,
      reporter_id,
    );

    res.status(200).json({
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSortedIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getSortedIssuesFromDB(req.body);

    res.status(200).json({
      success: true,
      message: "User Created",
      //data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issuesService.getSingleIssueFromDB(id as string);

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue fetched",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateIssues = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issuesService.updateIssuesIntoDB(
      req.body,
      id as string,
    );

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue Updated",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteIssues = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issuesService.deleteIssuesFromDB(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue Deleted",
      //data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const issuesController = {
  createIssues,
  getSingleIssue,
  getSortedIssues,
  updateIssues,
  deleteIssues,
};
