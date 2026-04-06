import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";
import ForbiddenAccess from "../pages/ForbiddenAccess";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role !== "admin") return <ForbiddenAccess></ForbiddenAccess>;
  return children;
};

export default AdminRoute;
