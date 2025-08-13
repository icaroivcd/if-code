import App from "@/App";
import Activities from "@/pages/activities/Activities";
import ActivitiesDetails from "@/pages/activitiesDetails/ActivitiesDetails";
import AppLayout from "@/pages/AppLayout";
import Submissions from "@/pages/submissions/Submissions";
import SubmissionsDetails from "@/pages/submissionsDetails/SubmissionsDetails";
import { BrowserRouter, Route, Routes } from "react-router";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<App />} />
          <Route path="activities">
            <Route index element={<Activities />} />
            <Route path=":id" element={<ActivitiesDetails />} />
          </Route>
          <Route path="submissions">
            <Route index element={<Submissions />} />
            <Route path=":submissionId" element={<SubmissionsDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
