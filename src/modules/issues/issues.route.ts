import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();

router.post("/",auth(USER_ROLE.contributor,USER_ROLE.maintainer), issuesController.createIssues);
router.get("/",auth(USER_ROLE.contributor,USER_ROLE.maintainer) ,issuesController.getSortedIssues);
router.get("/:id",auth(USER_ROLE.contributor,USER_ROLE.maintainer), issuesController.getSingleIssue);
router.patch("/:id",auth(USER_ROLE.contributor,USER_ROLE.maintainer) ,issuesController.updateIssues);
router.delete("/:id",auth(USER_ROLE.contributor,USER_ROLE.maintainer) ,issuesController.deleteIssues);

export const issuesRoute = router;
