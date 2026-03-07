import { CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  {
    id: 1,
    description: "Payment to Dr. Rafiq Ahmed - Mathematics",
    amount: "৳6,000",
    date: "2024-01-25",
    type: "debit",
    status: "Completed",
  },
  {
    id: 2,
    description: "Payment to Fatima Khan - English",
    amount: "৳5,000",
    date: "2024-01-20",
    type: "debit",
    status: "Completed",
  },
  {
    id: 3,
    description: "Payment to Arif Hossain - Physics",
    amount: "৳5,500",
    date: "2024-01-15",
    type: "debit",
    status: "Completed",
  },
  {
    id: 4,
    description: "Refund - Chemistry Tuition Cancelled",
    amount: "৳4,500",
    date: "2024-01-10",
    type: "credit",
    status: "Completed",
  },
];

const Payments = () => (
  <div>
    <h1 className="text-2xl font-bold">Payments</h1>
    <p className="text-muted-foreground">
      View your payment history and transactions
    </p>

    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      <div className="card-elevated rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Total Spent</p>
        <p className="mt-1 text-2xl font-bold">৳16,500</p>
      </div>
      <div className="card-elevated rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">This Month</p>
        <p className="mt-1 text-2xl font-bold">৳6,000</p>
      </div>
      <div className="card-elevated rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Refunds</p>
        <p className="mt-1 text-2xl font-bold">৳4,500</p>
      </div>
    </div>

    <div className="mt-8">
      <h2 className="font-heading text-lg font-semibold">
        Transaction History
      </h2>
      <div className="mt-4 space-y-3">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-xl border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.type === "debit" ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"}`}
              >
                {t.type === "debit" ? (
                  <ArrowUpRight className="h-5 w-5 text-red-600" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-green-600" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{t.description}</p>
                <p className="text-xs text-muted-foreground">{t.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${t.type === "debit" ? "text-red-600" : "text-green-600"}`}
              >
                {t.type === "debit" ? "-" : "+"}
                {t.amount}
              </p>
              <p className="text-xs text-muted-foreground">{t.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Payments;
