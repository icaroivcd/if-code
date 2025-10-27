import { useUser } from "@/context/UserContext";

/**
 * Custom hook to check user roles
 * @returns Object with role checking utilities
 */
export function useUserRole() {
    const { user } = useUser();

    /**
     * Check if user has a specific role
     * @param role - The role to check
     * @returns true if user has the role, false otherwise
     */
    const hasRole = (role: string): boolean => {
        if (!user || !user.roles) return false;
        return user.roles.includes(role);
    };

    /**
     * Check if user has at least one of the specified roles
     * @param roles - Array of roles to check
     * @returns true if user has at least one role, false otherwise
     */
    const hasAnyRole = (roles: string[]): boolean => {
        if (!user || !user.roles) return false;
        return roles.some(role => user.roles.includes(role));
    };

    /**
     * Check if user has all of the specified roles
     * @param roles - Array of roles to check
     * @returns true if user has all roles, false otherwise
     */
    const hasAllRoles = (roles: string[]): boolean => {
        if (!user || !user.roles) return false;
        return roles.every(role => user.roles.includes(role));
    };

    return {
        roles: user?.roles || [],
        hasRole,
        hasAnyRole,
        hasAllRoles
    };
}
