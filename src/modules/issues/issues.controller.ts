import { type Request, type Response } from "express";
import { issuesService } from "./issues.service"; 

 const createIssues = async (req: Request, res: Response) => {
   try {
     const result = await issuesService.createIssuesIntoDB(req.body);
 
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
   try {
     const result = await issuesService.getSingleIssueFromDB(req.body);
 
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

  const updateIssues = async (req: Request, res: Response) => {
   try {
     const result = await issuesService.updateIssuesIntoDB(req.body);
 
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

  const deleteIssues = async (req: Request, res: Response) => {
   try {
     const result = await issuesService.deleteIssuesFromDB(req.body);
 
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



export const issuesController = {
    createIssues,
    getSingleIssue,
    getSortedIssues,
    updateIssues,
    deleteIssues
}