import { ArrowDownRight, DollarSign, TrendingUp } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { formatDateWithMonth } from "../../../lib/utils";
import LoadingSpinner from "../../../components/LoadingSpinner";

const RevenueHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: revenues = [], isLoading } = useQuery({
    queryKey: ["tutor-revenue-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/tutor-revenue-history?email=${user?.email}`,
      );
      return res.data;
    },
  });
  const totalEarnings = revenues.reduce((sum, r) => sum + r.tutorAmount, 0);
  const thisMonth = revenues.filter((r) => {
    const date = new Date(r.createdAt);
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });
  const thisMonthTotal = thisMonth.reduce((sum, r) => sum + r.tutorAmount, 0);

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className="text-2xl font-bold">Revenue History</h1>
      <p className="text-muted-foreground">
        Your earnings and transaction records
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 text-center">
        <div className="card-elevated rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Earnings</p>
          <p className="mt-1 text-2xl font-bold">৳{totalEarnings}</p>
        </div>
        <div className="card-elevated rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">This Month</p>
          <p className="mt-1 text-2xl font-bold text-primary">
            ৳{thisMonthTotal}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-heading text-lg font-semibold">Transactions</h2>
        <div className="mt-4 space-y-3">
          {revenues.map((r) => (
            <div
              key={r._id}
              className="flex items-center justify-between rounded-xl border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                  <ArrowDownRight className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">From {r.studentName}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.tuitionSubject} • {formatDateWithMonth(r.createdAt)}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-green-600">+ ৳{r.tutorAmount}</p>
            </div>
          ))}
        </div>
      </div>
      {revenues?.length === 0 && (
        <div className="rounded-xl border border-dashed bg-muted/30 p-12 text-center">
          <DollarSign className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-muted-foreground">You have no revenue yet.</p>
        </div>
      )}
    </div>
  );
};

export default RevenueHistory;
