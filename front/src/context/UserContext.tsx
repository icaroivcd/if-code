import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import type { User } from "@/types";

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        console.log('token:', token);
        if (token) {
            axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
}