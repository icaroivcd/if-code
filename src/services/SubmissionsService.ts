import { fakeSubmissionReports } from "../mocks";
import type { SubmissionReport } from "../types";

/**
 * Simula uma chamada de API para buscar o relatório de submissão pelo submissionId.
 * @param submissionId id da submissão
 * @returns Promise<SubmissionReport | undefined>
 */
export async function getSubmissionReportBySubmissionId(
  submissionId: string
): Promise<SubmissionReport | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return fakeSubmissionReports.find((r) => r.submissionId === submissionId);
}
/**
 * Simula uma chamada de API para buscar uma submissão pelo id.
 * @param submissionId id da submissão
 * @returns Promise<Submission | undefined>
 */
export async function getSubmissionById(
  submissionId: string
): Promise<Submission | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return fakeSubmissions.find((s) => s.id === submissionId);
}
import type { Submission } from "../types";
import { fakeSubmissions } from "../mocks";

/**
 * Simula uma chamada de API para buscar todas as submissões.
 * @returns Promise<Submission[]>
 */
export async function getAllSubmissions(): Promise<Submission[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return fakeSubmissions;
}

/**
 * Simula uma chamada de API para buscar submissões por activityId.
 * @param activityId id da atividade
 * @returns Promise<Submission[]>
 */
export async function getSubmissionsByActivityId(
  activityId: string
): Promise<Submission[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return fakeSubmissions.filter((s) => s.activityId === activityId);
}
