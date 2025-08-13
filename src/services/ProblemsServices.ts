import type { Problem } from "../types";
import { fakeProblems } from "../mocks";

/**
 * Simula uma chamada de API para buscar um problema pelo id.
 * @param id id do problema
 * @returns Promise<Problem | undefined>
 */
export async function getProblemById(id: string): Promise<Problem | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return fakeProblems.find((p) => p.id === id);
}
