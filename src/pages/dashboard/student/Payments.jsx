import {
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstWord, formatDateWithMonth } from "../../../lib/utils";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Payments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["user-payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/user-payment-history?email=${user?.email}`,
      );
      return res.data;
    },
  });
  const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);
  const thisMonth = payments.filter((p) => {
    const date = new Date(p.createdAt);
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });
  const thisMonthTotal = thisMonth.reduce((sum, p) => sum + p.amount, 0);

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className="text-2xl font-bold">Payments</h1>
      <p className="text-muted-foreground">
        View your payment history and transactions
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 text-center">
        <div className="card-elevated rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Spent</p>
          <p className="mt-1 text-2xl font-bold">৳{totalSpent}</p>
        </div>
        <div className="card-elevated rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">This Month</p>
          <p className="mt-1 text-2xl font-bold">৳{thisMonthTotal}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-heading text-lg font-semibold">
          Transaction History
        </h2>
        <div className="mt-4 space-y-3">
          {payments.map((p) => (
            <div
              key={p._id}
              className="flex items-center justify-between rounded-xl border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl  bg-red-100 dark:bg-red-900/30">
                  <ArrowUpRight className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Payment to {p.tutorName} - {p.tuitionSubject}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateWithMonth(p.createdAt)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-600">-৳{p.amount}</p>
                <p className="text-xs text-muted-foreground">
                  {capitalizeFirstWord(p.paymentStatus)}
                </p>
              </div>
            </div>
          ))}
        </div>
        {payments?.length === 0 && (
          <div className="rounded-xl border border-dashed bg-muted/30 p-12 text-center">
            <DollarSign className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 text-muted-foreground">
              You have no transactions yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
