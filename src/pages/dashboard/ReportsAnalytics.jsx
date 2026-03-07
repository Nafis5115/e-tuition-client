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

const monthlyRevenue = [
  { month: "Jul", amount: 15000 },
  { month: "Aug", amount: 22000 },
  { month: "Sep", amount: 28000 },
  { month: "Oct", amount: 35000 },
  { month: "Nov", amount: 40000 },
  { month: "Dec", amount: 45000 },
];

const userDistribution = [
  { name: "Students", value: 850, color: "hsl(168, 80%, 36%)" },
  { name: "Tutors", value: 380, color: "hsl(32, 95%, 55%)" },
  { name: "Admins", value: 20, color: "hsl(210, 80%, 52%)" },
];

const tuitionStats = [
  { month: "Jul", approved: 40, rejected: 8 },
  { month: "Aug", approved: 55, rejected: 12 },
  { month: "Sep", approved: 62, rejected: 10 },
  { month: "Oct", approved: 70, rejected: 15 },
  { month: "Nov", approved: 78, rejected: 11 },
  { month: "Dec", approved: 85, rejected: 9 },
];

const recentTransactions = [
  {
    id: 1,
    from: "Ahmed Rahman",
    to: "Dr. Rafiq Ahmed",
    amount: "৳6,000",
    date: "2024-01-25",
  },
  {
    id: 2,
    from: "Kamal Uddin",
    to: "Fatima Khan",
    amount: "৳7,000",
    date: "2024-01-22",
  },
  {
    id: 3,
    from: "Nusrat Jahan",
    to: "Arif Hossain",
    amount: "৳5,000",
    date: "2024-01-20",
  },
  {
    id: 4,
    from: "Rina Begum",
    to: "Sumon Mia",
    amount: "৳4,500",
    date: "2024-01-18",
  },
];

const ReportsAnalytics = () => (
  <div>
    <h1 className="text-2xl font-bold">Reports & Analytics</h1>
    <p className="text-muted-foreground">
      Platform performance and financial reports
    </p>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { label: "Total Revenue", value: "৳2,50,000" },
        { label: "This Month", value: "৳45,000" },
        { label: "Total Transactions", value: "340" },
        { label: "Active Users", value: "1,250" },
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
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Bar
              dataKey="amount"
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
          <LineChart data={tuitionStats}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="approved"
              stroke="hsl(168, 80%, 36%)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="rejected"
              stroke="hsl(0, 72%, 51%)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border bg-card p-5">
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
      </div>
    </div>
  </div>
);

export default ReportsAnalytics;
