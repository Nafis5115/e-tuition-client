import React from "react";

import { Users, BookOpen, CreditCard, BarChart3 } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/admin-dashboard`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Platform overview and management.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-elevated rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="mt-1 text-2xl font-bold">{data.totalUsers}</p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary`}
            >
              <Users className="h-5 w-5" />
            </div>
          </div>
        </div>{" "}
        <div className="card-elevated rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Tuitions</p>
              <p className="mt-1 text-2xl font-bold">{data.activeTuitions}</p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-accent`}
            >
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
        </div>{" "}
        <div className="card-elevated rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Platform Revenue</p>
              <p className="mt-1 text-2xl font-bold">{data.totalRevenue}</p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-success`}
            >
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
        </div>{" "}
        <div className="card-elevated rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="mt-1 text-2xl font-bold">{data.monthlyRevenue}</p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-info`}
            >
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
