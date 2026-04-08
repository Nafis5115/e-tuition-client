import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ReportsAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-reportsAndAnalytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin-reportsAndAnalytics");
      return res.data;
    },
  });
  const userDistribution = [
    {
      name: "Students",
      value: data.studentsCount,
      color: "hsl(168, 80%, 36%)",
    },
    { name: "Tutors", value: data.tutorCount, color: "hsl(32, 95%, 55%)" },
    { name: "Admins", value: data.adminCount, color: "hsl(210, 80%, 52%)" },
  ];

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className="text-2xl font-bold">Reports & Analytics</h1>
      <p className="text-muted-foreground">
        Platform performance and financial reports
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: data.totalRevenue },
          { label: "This Month", value: data.monthlyRevenue },
          { label: "Total Transactions", value: data.paymentCount },
          { label: "Total Users", value: data.totalUser },
        ].map((s, i) => (
          <div key={i} className="card-elevated rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="font-heading text-lg font-semibold mb-4">
            Monthly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.monthlyRevenueChart}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="hsl(168, 80%, 36%)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h2 className="font-heading text-lg font-semibold mb-4">
            User Distribution
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={userDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {userDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h2 className="font-heading text-lg font-semibold mb-4">
            Tuition Approvals
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.tuitionApprovalsChart}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalApproved"
                stroke="hsl(168, 80%, 36%)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="totalRejected"
                stroke="hsl(0, 72%, 51%)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* <div className="rounded-xl border bg-card p-5">
        <h2 className="font-heading text-lg font-semibold mb-4">
          Recent Transactions
        </h2>
        <div className="space-y-3">
          {recentTransactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-lg bg-muted p-3 text-sm"
            >
              <div>
                <p className="font-medium">
                  {t.from} → {t.to}
                </p>
                <p className="text-xs text-muted-foreground">{t.date}</p>
              </div>
              <p className="font-semibold text-primary">{t.amount}</p>
            </div>
          ))}
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default ReportsAnalytics;
