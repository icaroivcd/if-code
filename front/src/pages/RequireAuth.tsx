import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export default function RequireAuth() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      axios.get("/api/user", { withCredentials: true })
        .then(res => {
          if (res.data && res.data.id) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}