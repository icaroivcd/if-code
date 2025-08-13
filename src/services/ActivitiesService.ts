import type { Activity, Page } from "../types";
import { fakePageActivities } from "../mocks";

/**
 * Simula uma chamada de API para buscar todas as atividades (paginadas).
 * @returns Promise<Page<Activity>>
 */
export async function getAllActivities(): Promise<Page<Activity>> {
  // Simula latência de rede
  await new Promise((resolve) => setTimeout(resolve, 300));
  return fakePageActivities;
}
