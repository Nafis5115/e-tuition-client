import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";
import ForbiddenAccess from "../pages/ForbiddenAccess";

const TutorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role !== "tutor") return <ForbiddenAccess></ForbiddenAccess>;
  return children;
};

export default TutorRoute;
