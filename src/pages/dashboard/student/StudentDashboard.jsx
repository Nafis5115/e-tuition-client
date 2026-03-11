import { BookOpen, Users, CreditCard, FileText } from "lucide-react";

const stats = [
  {
    label: "Active Tuitions",
    value: "3",
    icon: BookOpen,
    color: "text-primary",
  },
  {
    label: "Tutor Applications",
    value: "12",
    icon: Users,
    color: "text-accent",
  },
  {
    label: "Total Spent",
    value: "৳15,000",
    icon: CreditCard,
    color: "text-success",
  },
  { label: "Pending Posts", value: "1", icon: FileText, color: "text-warning" },
];

const StudentDashboard = () => (
  <div>
    <h1 className="text-2xl font-bold">Student Dashboard</h1>
    <p className="text-muted-foreground">
      Welcome back! Here's an overview of your activity.
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

    <div className="mt-8">
      <h2 className="font-heading text-lg font-semibold">Recent Activity</h2>
      <div className="mt-4 space-y-3">
        {[
          "Mathematics tuition post approved",
          "New tutor applied to Physics tuition",
          "Payment of ৳5,000 completed",
        ].map((a, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 text-sm">
            <span className="text-muted-foreground">•</span> {a}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StudentDashboard;
