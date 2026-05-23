import { Router } from "express";
import { issuesController } from "./issues.controller";

const router = Router();

router.post("/", issuesController.createIssues);
router.get("/", issuesController.getSortedIssues);
router.get("/:id", issuesController.getSingleIssue);
router.patch("/:id", issuesController.updateIssues);
router.delete("/:id", issuesController.deleteIssues);

export const issuesRoute = router;
