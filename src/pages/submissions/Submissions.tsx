import { useEffect, useMemo, useState } from "react";
import type { Activity, Submission } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllSubmissions } from "@/services/SubmissionsService";
import { getAllActivities } from "@/services/ActivitiesService";
import { useNavigate } from "react-router";

export default function Submissions() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const mapActivitiesTitle = useMemo(() => {
    return new Map(activities.map((activity) => [activity.id, activity.title]));
  }, [activities]);

  async function fetchSubmissions() {
    const data = await getAllSubmissions();
    setSubmissions(data);
  }
  async function fetchActivities() {
    const data = await getAllActivities();
    setActivities(data.items);
  }

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchSubmissions(), fetchActivities()]);
    };
    fetchData();
  }, []);

  function redirectToSubmission(submission: Submission) {
    console.log("Redirecting to submission:", submission);
    navigate(`/submissions/${submission.id}`);
  }

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Submissões
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Atividade</TableHead>
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
              <TableCell>
                {mapActivitiesTitle.get(submission.activityId) ||
                  "Atividade não encontrada"}
              </TableCell>
              <TableCell>{submission.dateSubmitted}</TableCell>
              <TableCell>{submission.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
