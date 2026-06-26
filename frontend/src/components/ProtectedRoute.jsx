import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, token } = useAuth();

  // 1. If token or user context state isn't initialized yet, bounce to login
  if (!token || !user) {
    console.log("Access Denied: Unauthenticated session. Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  // 2. Normalize and check if user role matches route access rules
  const contextRole = user.role ? user.role.toLowerCase().trim() : "";
  const targetedRole = requiredRole ? requiredRole.toLowerCase().trim() : "";

  // Handle cross-compatibility for admin/authority naming variations
  const isAuthorityMatch = 
    targetedRole === "authority" && (contextRole === "authority" || contextRole === "admin");

  if (targetedRole && contextRole !== targetedRole && !isAuthorityMatch) {
    console.warn(`Access Denied: Role '${contextRole}' does not match required '${targetedRole}'`);
    // Redirect citizens trying to access admin pages, or vice versa
    return <Navigate to={contextRole === "authority" || contextRole === "admin" ? "/admin" : "/submit"} replace />;
  }

  // 3. Authorized access granted
  return children;
}