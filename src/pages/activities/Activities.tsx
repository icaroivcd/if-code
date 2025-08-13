import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllActivities } from "@/services/ActivitiesService";
import type { Activity } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Activities() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getAllActivities();
      setActivities(data.items);
    };

    fetchActivities();
  }, []);

  function redirectToActivity(activity: Activity) {
    console.log("Redirecting to activity:", activity);
    navigate(`/activities/${activity.id}`);
  }

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Atividades
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow
              key={activity.id}
              onClick={() => redirectToActivity(activity)}
            >
              <TableCell>{activity.title}</TableCell>
              <TableCell>{activity.dueDate}</TableCell>
              <TableCell>{activity.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
