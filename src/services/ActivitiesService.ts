/**
 * Simula uma chamada de API para buscar uma atividade pelo id.
 * @param activityId id da atividade
 * @returns Promise<Activity | undefined>
 */
export async function getActivityById(
  activityId: string
): Promise<Activity | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return fakePageActivities.items.find((a) => a.id === activityId);
}
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
