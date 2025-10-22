/* eslint-disable @typescript-eslint/no-explicit-any */
import { fakeSubmissionReports } from "../mocks";
import type { SubmissionReport, TestCaseResult } from "../types";

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
import axios from "axios";

/**
 * Simula uma chamada de API para buscar todas as submissões.
 * @returns Promise<Submission[]>
 */
export async function getAllSubmissions(): Promise<Submission[]> {
  try {
    const response = await axios.get("http://localhost:8000/api/submissoes");

    return response.data.map((submissao: any) => ({
      id: submissao.id,
      activityId: submissao.atividade_id,
      dateSubmitted: submissao.data_submissao,
      language: "c",
      status: "partial",
    }));
  } catch (error) {
    console.log("erro", error);
  }

  return [];
}

export async function getResultBySubmissionId(
  submissionId: number
): Promise<TestCaseResult[]> {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/correcao/busca-por-submissao/${submissionId}`
    );
    return response.data.map((item: any) => ({
      id: item.id,
      testCaseId: item.caso_teste_id,
      status: item.status,
      submissionId: item.submissao_id,
    }));
  } catch (error) {
    console.log("erro", error);
  }
  return [];
}

export async function postSubmission({
  code,
  activityId,
}: {
  code: string;
  activityId: number;
}): Promise<Submission | undefined> {
  try {
    const response = await axios.post("http://localhost:8000/api/submissoes", {
      codigo: code,
      atividade_id: activityId,
    });
    return response.data;
  } catch (error) {
    console.log("erro", error);
    throw error;
  }
  return undefined;
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
