export type ActivityStatus = "completed" | "pending" | "overdue";
export type SubmissionStatus =
  | "approved"
  | "partial"
  | "failed"
  | "compile-error";
export type Language = "c" | "cpp" | "java" | "python";

export type Activity = {
  id: string;
  problemId: string;
  title: string;
  dueDate: string; // ISO date string
  status: ActivityStatus;
};

export type Problem = {
  id: string;
  title: string;
  statement: string;
  timeLimitMs: number;
  memoryLimitKb: number;
};

export type Submission = {
  id: string;
  activityId: string;
  dateSubmitted: string; // ISO date string
  language: Language;
  status: SubmissionStatus;
};

export type Evaluation = {
  id: string;
  submissionId: string;
  token: string;
  status: SubmissionStatus;
};

export type TestCase = {
  id: string;
  input: string;
  expectedOutput: string;
  private: boolean;
};

export type TestCaseResult = {
  id: string;
  input?: string;
  expectedOutput: string;
  actualOutput: string;
  status: "passed" | "failed";
};

export type SubmissionReport = {
  submissionId: string;
  activityTitle: string;
  language: Language;
  dateSubmitted: string;
  overallStatus: SubmissionStatus;
  testCases: TestCaseResult[];
  compileLog?: string;
};

export type Page<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};
