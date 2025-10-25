import Loading from "@/components/Loading";
import { useUser } from "@/context/UserContext";
import { Navigate, Outlet } from "react-router";

export default function RequireAuth() {
    const { user, loading } = useUser();

    if (loading) return <Loading />;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}