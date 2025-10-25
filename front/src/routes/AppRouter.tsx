import App from "@/App";
import Activities from "@/pages/activities/Activities";
import ActivitiesDetails from "@/pages/activitiesDetails/ActivitiesDetails";
import AppLayout from "@/pages/AppLayout";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import ChangePassword from "@/pages/changePassword/ChangePassword";
import RequireAuth from "@/pages/RequireAuth";
import Submissions from "@/pages/submissions/Submissions";
import SubmissionsDetails from "@/pages/submissionsDetails/SubmissionsDetails";
import { BrowserRouter, Route, Routes } from "react-router";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<App />} />
            <Route path="home" element={<Home />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="activities">
              <Route index element={<Activities />} />
              <Route path=":id" element={<ActivitiesDetails />} />
            </Route>
            <Route path="submissions">
              <Route index element={<Submissions />} />
              <Route
                path=":activityId/:submissionId"
                element={<SubmissionsDetails />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
