export const USER_ROLE = {
  contributor: "contributor",
  maintainer: "maintainer",
} as const;

export const SORT_ORDER = {
  newest: "newest",
  oldest: "oldest",
} as const;

export const ISSUE_TYPE = {
  bug: "bug",
  feature_request: "feature_request",
} as const;

export const ISSUE_STATUS = {
  open: "open",
  in_progress: "in_progress",
  resolved: "resolved",
} as const;

export type ROLES = (typeof USER_ROLE)[keyof typeof USER_ROLE];
export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
export type IssueType = (typeof ISSUE_TYPE)[keyof typeof ISSUE_TYPE];
export type IssueStatus = (typeof ISSUE_STATUS)[keyof typeof ISSUE_STATUS];

export interface IQueryParam {
  sort?: SortOrder;
  type?: IssueType;
  status?: IssueStatus;
}
