/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Activity, Page } from "../types";
import { fakePageActivities } from "../mocks";
import axios from "axios";

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

/**
 * Simula uma chamada de API para buscar todas as atividades (paginadas).
 * @returns Promise<Page<Activity>>
 */
export async function getAllActivities(): Promise<Page<Activity>> {
  try {
    const response = await axios.get("http://localhost:8000/api/atividades");
    console.log("resposta", response.data);

    const activities: Array<Activity> = [];

    response.data.forEach((atividade: any) => {
      activities.push({
        id: atividade.id,
        problemId: atividade.problema_id,
        dueDate: atividade.data_entrega,
        status: "pending",
        title: "",
      });
    });

    return {
      items: activities,
      page: 1,
      totalPages: 1,
      total: activities.length,
      pageSize: activities.length,
    } as Page<Activity>;
  } catch (error) {
    console.log("erro", error);
  }
  return {
    items: [],
    page: 1,
    totalPages: 1,
    total: 0,
    pageSize: 0,
  } as Page<Activity>;
}
