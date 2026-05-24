import { type Request, type Response } from "express";
import { issuesService } from "./issues.service";

const createIssues = async (req: Request, res: Response) => {
  try {
    const reporter_id = req.user.id;
    const result = await issuesService.createIssuesIntoDB(
      req.body,
      reporter_id,
    );

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

const getSortedIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getSortedIssuesFromDB(req.query);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No issues found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issues retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issuesService.getSingleIssueFromDB(id as string);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue retrived successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

const updateIssues = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issuesService.updateIssuesIntoDB(
      req.body,
      id as string,
      req.user,
    );

    if (result.rows.length === 0) {
      res.status(404).json({
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
      errors: error,
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
      message: "Issue deleted successfully",
      //data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error,
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
