import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getActivityById } from "@/services/ActivitiesService";
import {
  getSubmissionById,
  getSubmissionReportBySubmissionId,
} from "@/services/SubmissionsService";
import type { Activity, Submission, SubmissionReport } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function SubmissionsDetails() {
  const params = useParams();
  const submissionId = params.submissionId;
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [submission, setSubmission] = useState<Submission>();
  const [submissionReport, setSubmissionReport] = useState<SubmissionReport>();

  useEffect(() => {
    const fetchData = async () => {
      if (!submissionId) return;

      const submissionCall = getSubmissionById(submissionId);
      const submissionReportCall =
        getSubmissionReportBySubmissionId(submissionId);

      const [submissionData, submissionReport] = await Promise.all([
        submissionCall,
        submissionReportCall,
      ]);

      setSubmission(submissionData);
      setSubmissionReport(submissionReport);
      if (submissionData) {
        const activityData = await getActivityById(submissionData.activityId);
        setSelectedActivity(activityData);
      }
    };
    fetchData();
  }, [submissionId]);

  if (
    selectedActivity === undefined ||
    submission === undefined ||
    submissionReport === undefined
  ) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Submissão
      </h1>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {selectedActivity.title}
      </h2>
      <p className="text-muted-foreground text-xl">
        Data atividade: {selectedActivity.dueDate}
      </p>
      <p className="text-muted-foreground text-xl">
        Data envio: {submission.dateSubmitted}
      </p>
      <p className="text-muted-foreground text-xl">
        Status: {submission.status}
      </p>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Casos de Teste
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teste</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Saída Atual</TableHead>
            <TableHead>Saída Esperada</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissionReport.testCases.map((testCase) => (
            <TableRow key={testCase.id}>
              <TableCell>{testCase.id}</TableCell>
              <TableCell>{testCase.status}</TableCell>
              <TableCell>{testCase.actualOutput}</TableCell>
              <TableCell>{testCase.expectedOutput}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
