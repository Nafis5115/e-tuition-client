import { ArrowDownRight, TrendingUp } from "lucide-react";

const transactions = [
  {
    id: 1,
    from: "Ahmed Rahman",
    subject: "Mathematics - Class 10",
    amount: "৳6,000",
    date: "2024-01-25",
  },
  {
    id: 2,
    from: "Kamal Uddin",
    subject: "Physics - Class 12",
    amount: "৳7,000",
    date: "2024-01-20",
  },
  {
    id: 3,
    from: "Nusrat Jahan",
    subject: "English - Class 8",
    amount: "৳5,000",
    date: "2024-02-01",
  },
];

const RevenueHistory = () => (
  <div>
    <h1 className="text-2xl font-bold">Revenue History</h1>
    <p className="text-muted-foreground">
      Your earnings and transaction records
    </p>

    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      <div className="card-elevated rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Total Earnings</p>
        <p className="mt-1 text-2xl font-bold">৳18,000</p>
      </div>
      <div className="card-elevated rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">This Month</p>
        <p className="mt-1 text-2xl font-bold text-primary">৳6,000</p>
      </div>
      <div className="card-elevated rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Active Tuitions</p>
        <p className="mt-1 text-2xl font-bold">3</p>
      </div>
    </div>

    <div className="mt-8">
      <h2 className="font-heading text-lg font-semibold">Transactions</h2>
      <div className="mt-4 space-y-3">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-xl border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                <ArrowDownRight className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">From {t.from}</p>
                <p className="text-xs text-muted-foreground">
                  {t.subject} • {t.date}
                </p>
              </div>
            </div>
            <p className="font-semibold text-green-600">+{t.amount}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RevenueHistory;
