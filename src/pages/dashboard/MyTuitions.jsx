import { useState } from "react";

import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Edit, Trash2, Eye, MapPin, DollarSign, BookOpen } from "lucide-react";
import { Link } from "react-router";

const sampleTuitions = [
  {
    id: 1,
    subject: "Mathematics",
    class: "Class 10",
    location: "Dhanmondi, Dhaka",
    budget: "৳5,000/month",
    status: "Approved",
    schedule: "Sun, Tue, Thu - 5PM",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    subject: "Physics",
    class: "Class 12",
    location: "Gulshan, Dhaka",
    budget: "৳6,000/month",
    status: "Pending",
    schedule: "Mon, Wed - 6PM",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    subject: "English",
    class: "Class 8",
    location: "Uttara, Dhaka",
    budget: "৳4,000/month",
    status: "Rejected",
    schedule: "Sat, Mon - 4PM",
    createdAt: "2024-01-22",
  },
];

const statusColor = {
  Approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const MyTuitions = () => {
  const [tuitions, setTuitions] = useState(sampleTuitions);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tuition post?")) {
      setTuitions(tuitions.filter((t) => t.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Tuitions</h1>
          <p className="text-muted-foreground">
            View and manage your tuition posts
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/post-tuition">+ Post New Tuition</Link>
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {tuitions.map((t) => (
          <div
            key={t.id}
            className="card-elevated rounded-xl border bg-card p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">
                      {t.subject}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t.class} • {t.schedule}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {t.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <DollarSign className="h-3.5 w-3.5" /> {t.budget}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[t.status]}`}
                >
                  {t.status}
                </span>
                <Button size="icon" variant="ghost" asChild>
                  <Link to={`/tuitions/${t.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="icon" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => handleDelete(t.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {tuitions.length === 0 && (
          <div className="rounded-xl border border-dashed bg-muted/30 p-12 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 text-muted-foreground">
              No tuitions posted yet.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/dashboard/post-tuition">Post Your First Tuition</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTuitions;
