import type {
  Activity,
  Problem,
  Submission,
  Evaluation,
  TestCase,
  TestCaseResult,
  SubmissionReport,
  Page,
} from "../types";

// Fake Activities
export const fakeActivities: Activity[] = [
  {
    id: "1",
    problemId: "p1",
    title: "Soma Simples",
    dueDate: "2025-08-20T23:59:59Z",
    status: "pending",
  },
  {
    id: "2",
    problemId: "p2",
    title: "Fatorial",
    dueDate: "2025-08-15T23:59:59Z",
    status: "completed",
  },
  {
    id: "3",
    problemId: "p3",
    title: "Números Primos",
    dueDate: "2025-08-10T23:59:59Z",
    status: "overdue",
  },
];

// Fake Problems
export const fakeProblems: Problem[] = [
  {
    id: "p1",
    title: "Soma Simples",
    statement: "Some dois números inteiros.",
    timeLimitMs: 1000,
    memoryLimitKb: 65536,
  },
  {
    id: "p2",
    title: "Fatorial",
    statement: "Calcule o fatorial de um número inteiro.",
    timeLimitMs: 2000,
    memoryLimitKb: 65536,
  },
  {
    id: "p3",
    title: "Números Primos",
    statement: "Verifique se um número é primo.",
    timeLimitMs: 1500,
    memoryLimitKb: 65536,
  },
];

// Fake Submissions
export const fakeSubmissions: Submission[] = [
  {
    id: "s1",
    activityId: "1",
    dateSubmitted: "2025-08-13T10:00:00Z",
    language: "python",
    status: "approved",
  },
  {
    id: "s2",
    activityId: "2",
    dateSubmitted: "2025-08-12T15:30:00Z",
    language: "java",
    status: "partial",
  },
  {
    id: "s3",
    activityId: "3",
    dateSubmitted: "2025-08-11T09:45:00Z",
    language: "cpp",
    status: "failed",
  },
];

// Fake Evaluations
export const fakeEvaluations: Evaluation[] = [
  {
    id: "e1",
    submissionId: "s1",
    token: "token123",
    status: "approved",
  },
  {
    id: "e2",
    submissionId: "s2",
    token: "token456",
    status: "partial",
  },
];

// Fake Test Cases
export const fakeTestCases: TestCase[] = [
  {
    id: "tc1",
    input: "2 3",
    expectedOutput: "5",
    private: false,
  },
  {
    id: "tc2",
    input: "10 20",
    expectedOutput: "30",
    private: true,
  },
];

// Fake Test Case Results
export const fakeTestCaseResults: TestCaseResult[] = [
  {
    id: "tc1",
    input: "2 3",
    expectedOutput: "5",
    actualOutput: "5",
    status: "passed",
  },
  {
    id: "tc2",
    input: "10 20",
    expectedOutput: "30",
    actualOutput: "25",
    status: "failed",
  },
];

// Fake Submission Reports
export const fakeSubmissionReports: SubmissionReport[] = [
  {
    submissionId: "s1",
    activityTitle: "Soma Simples",
    language: "C",
    dateSubmitted: "2025-08-13T10:00:00Z",
    overallStatus: "approved",
    testCases: fakeTestCaseResults,
    compileLog: undefined,
  },
  {
    submissionId: "s2",
    activityTitle: "Fatorial",
    language: "C",
    dateSubmitted: "2025-08-12T15:30:00Z",
    overallStatus: "partial",
    testCases: fakeTestCaseResults,
    compileLog: "Warning: variável não utilizada.",
  },
  {
    submissionId: "s3",
    activityTitle: "Números Primos",
    language: "C",
    dateSubmitted: "2025-08-12T15:30:00Z",
    overallStatus: "partial",
    testCases: fakeTestCaseResults,
    compileLog: "Warning: variável não utilizada.",
  },
];

// Fake Page
export const fakePageActivities: Page<Activity> = {
  items: fakeActivities,
  page: 1,
  pageSize: 10,
  total: 3,
};
