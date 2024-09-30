import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
