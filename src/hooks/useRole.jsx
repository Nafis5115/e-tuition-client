import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: role = {}, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user/${user?.email}/role`);
      return res.data?.role || "student";
    },
  });
  return { role, roleLoading };
};

export default useRole;
