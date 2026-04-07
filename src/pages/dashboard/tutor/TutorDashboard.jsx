import { BookOpen, ClipboardList, CreditCard, TrendingUp } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";

const TutorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["tutor-dashboard-data", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/tutor-dashboard?email=${user?.email}`,
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
      <p className="text-muted-foreground">
        Manage your applications and tuitions.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-elevated rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Active Applications
              </p>
              <p className="mt-1 text-2xl font-bold">
                {data.activeApplications}
              </p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary`}
            >
              <ClipboardList className="h-5 w-5" />
            </div>
          </div>
        </div>{" "}
        <div className="card-elevated rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ongoing Tuitions</p>
              <p className="mt-1 text-2xl font-bold">{data.ongoingTuitions}</p>
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
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <p className="mt-1 text-2xl font-bold">{data.totalEarnings}</p>
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
              <p className="mt-1 text-2xl font-bold">{data.monthlyEarnings}</p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-info`}
            >
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
