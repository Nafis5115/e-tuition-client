import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Users, BookOpen, CreditCard, BarChart3 } from "lucide-react";

const stats = [
  { label: "Total Users", value: "1,250", icon: Users, color: "text-primary" },
  {
    label: "Active Tuitions",
    value: "340",
    icon: BookOpen,
    color: "text-accent",
  },
  {
    label: "Platform Revenue",
    value: "৳2,50,000",
    icon: CreditCard,
    color: "text-success",
  },
  {
    label: "This Month",
    value: "৳45,000",
    icon: BarChart3,
    color: "text-info",
  },
];

const AdminDashboard = () => (
  <DashboardLayout role="admin">
    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    <p className="text-muted-foreground">Platform overview and management.</p>

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

    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-heading text-lg font-semibold">
          Recent Tuition Posts
        </h2>
        <div className="mt-3 space-y-2">
          {[
            "Mathematics - Class 10 (Pending)",
            "Physics - Class 12 (Approved)",
            "English - Class 8 (Rejected)",
          ].map((t, i) => (
            <div key={i} className="rounded-lg bg-muted p-3 text-sm">
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-heading text-lg font-semibold">
          Recent Transactions
        </h2>
        <div className="mt-3 space-y-2">
          {[
            "৳5,000 - Ahmed Rahman → Dr. Rafiq",
            "৳6,000 - Kamal Uddin → Fatima Khan",
            "৳4,500 - Nusrat → Arif Hossain",
          ].map((t, i) => (
            <div key={i} className="rounded-lg bg-muted p-3 text-sm">
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default AdminDashboard;
