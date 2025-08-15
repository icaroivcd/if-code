/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Problem } from "../types";
import { fakeProblems } from "../mocks";
import axios from "axios";

/**
 * Simula uma chamada de API para buscar um problema pelo id.
 * @param id id do problema
 * @returns Promise<Problem | undefined>
 */
export async function getProblemById(id: string): Promise<Problem | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return fakeProblems.find((p) => p.id === id);
}

export async function getAllProblems(): Promise<Problem[]> {
  try {
    const response = await axios.get("http://localhost:8000/api/problemas");
    console.log("resposta problems", response.data[0]);

    return response.data[0].map((problema: any) => ({
      id: problema.id,
      title: problema.titulo,
      statement: problema.enunciado,
      createdAt: problema.created_at,
      updatedAt: problema.updated_at,
      testCases: problema.casos_teste.map((caso: any) => ({
        id: caso.id,
        input: caso.entrada,
        expectedOutput: caso.saida,
        private: caso.privado,
      })),
    }));
  } catch (error) {
    console.log("erro", error);
  }

  return [];
}
