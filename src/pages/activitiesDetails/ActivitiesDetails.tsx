import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllActivities } from "@/services/ActivitiesService";
import { getProblemById } from "@/services/ProblemsServices";
import { getSubmissionsByActivityId } from "@/services/SubmissionsService";
import type { Activity, Problem, Submission } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ActivitiesDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [selectedProblem, setSelectedProblem] = useState<Problem>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const activityId = params.id;
  const [submissionCodeFile, setSubmissionCodeFile] = useState<File | null>(
    null
  );
  const [submissionCodeText, setSubmissionCodeText] = useState<string>("");

  const fetchActivities = async () => {
    const data = await getAllActivities();
    setActivities(data.items);
  };

  const fetchProblem = async (activity: Activity) => {
    const data = await getProblemById(activity.problemId);
    setSelectedProblem(data);
  };

  const fetchSubmissions = async (activity: Activity) => {
    const data = await getSubmissionsByActivityId(activity.id);
    setSubmissions(data);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    if (activityId) {
      setSelectedActivity(
        activities.find((activity) => activity.id === activityId.toString())
      );
    }
  }, [activityId, activities]);

  useEffect(() => {
    if (selectedActivity) {
      fetchProblem(selectedActivity);
      fetchSubmissions(selectedActivity);
    }
  }, [selectedActivity]);

  useEffect(() => {
    if (submissionCodeFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSubmissionCodeText(reader.result as string);
      };
      reader.readAsText(submissionCodeFile);
    }
  }, [submissionCodeFile]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    setSubmissionCodeFile(file);
  }

  function redirectToSubmission(submission: Submission) {
    console.log("Redirecting to submission:", submission);
    navigate(`/submissions/${submission.id}`);
  }

  if (selectedActivity === undefined || selectedProblem === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        {selectedActivity.title}
      </h1>
      <span className="text-muted-foreground text-xl">
        {selectedActivity.dueDate}
      </span>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {selectedProblem.title}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {selectedProblem.statement}
      </p>

      <Label htmlFor="code">Código submissão</Label>
      <Input id="code" type="file" accept=".c" onChange={handleFileChange} />
      {submissionCodeFile && (
        <p>Arquivo selecionado: {submissionCodeFile.name}</p>
      )}
      {submissionCodeText && (
        <div>
          <h3>Código Submissão:</h3>
          <pre>{submissionCodeText}</pre>
        </div>
      )}
      <Button>Enviar submissão</Button>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Submissões
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data de submissão</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow
              key={submission.id}
              onClick={() => redirectToSubmission(submission)}
            >
              <TableCell>{submission.dateSubmitted}</TableCell>
              <TableCell>{submission.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
