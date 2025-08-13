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
