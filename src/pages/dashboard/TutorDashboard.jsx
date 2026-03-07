import DashboardLayout from "../../components/DashboardLayout";
import { BookOpen, ClipboardList, CreditCard, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Active Applications",
    value: "5",
    icon: ClipboardList,
    color: "text-primary",
  },
  {
    label: "Ongoing Tuitions",
    value: "3",
    icon: BookOpen,
    color: "text-accent",
  },
  {
    label: "Total Earnings",
    value: "৳18,000",
    icon: CreditCard,
    color: "text-success",
  },
  {
    label: "This Month",
    value: "৳6,000",
    icon: TrendingUp,
    color: "text-info",
  },
];

const TutorDashboard = () => (
  <DashboardLayout role="tutor">
    <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
    <p className="text-muted-foreground">
      Manage your applications and tuitions.
    </p>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="card-elevated rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-bold">{s.value}</p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted ${s.color}`}
            >
              <s.icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </DashboardLayout>
);

export default TutorDashboard;
