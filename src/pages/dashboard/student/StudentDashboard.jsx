import { BookOpen, Users, CreditCard, FileText } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";

const StudentDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["student-dashboard-data", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/student-dashboard?email=${user?.email}`,
      );
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back! Here's an overview of your activity.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-elevated rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ongoing Tuitions</p>
              <p className="mt-1 text-2xl font-bold">{data.activeTuitions}</p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary`}
            >
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="card-elevated rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Tutor Applications
              </p>
              <p className="mt-1 text-2xl font-bold">
                {data.tutorApplications}
              </p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-accent`}
            >
              <Users className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="card-elevated rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="mt-1 text-2xl font-bold">৳{data.totalSpent}</p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-success`}
            >
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="card-elevated rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Tuitions</p>
              <p className="mt-1 text-2xl font-bold">{data.pendingTuitions}</p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-warning`}
            >
              <FileText className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
