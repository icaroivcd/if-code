import Loading from "@/components/Loading";
import { useUser } from "@/context/UserContext";
import { Navigate, Outlet } from "react-router";

type RequireRoleProps = {
    allowedRoles: string[];
};

/**
 * Component to protect routes based on user roles
 * Redirects to /unauthorized if user doesn't have required role
 */
export default function RequireRole({ allowedRoles }: RequireRoleProps) {
    const { user, loading } = useUser();

    // Show loading while fetching user data and roles
    if (loading) return <Loading />;

    // If no user, redirect to login (should be caught by RequireAuth first)
    if (!user) return <Navigate to="/login" replace />;

    // Check if user has at least one of the allowed roles
    const hasRequiredRole = user.roles?.some(role => 
        allowedRoles.includes(role)
    );

    // If user doesn't have required role, redirect to unauthorized page
    if (!hasRequiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    // User has required role, render children
    return <Outlet />;
}
