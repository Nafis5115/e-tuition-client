import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Edit, Trash2, MapPin, DollarSign } from "lucide-react";
import { toast } from "sonner";

const initialApps = [
  {
    id: 1,
    tuitionSubject: "Mathematics - Class 10",
    location: "Dhanmondi, Dhaka",
    expectedSalary: "৳6,000/month",
    status: "Pending",
    appliedDate: "2024-01-18",
  },
  {
    id: 2,
    tuitionSubject: "Physics - Class 12",
    location: "Gulshan, Dhaka",
    expectedSalary: "৳7,000/month",
    status: "Approved",
    appliedDate: "2024-01-15",
  },
  {
    id: 3,
    tuitionSubject: "Chemistry - Class 11",
    location: "Mirpur, Dhaka",
    expectedSalary: "৳5,500/month",
    status: "Rejected",
    appliedDate: "2024-01-12",
  },
];

const statusColor = {
  Approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const MyApplications = () => {
  const [apps, setApps] = useState(initialApps);

  const handleDelete = (id) => {
    const app = apps.find((a) => a.id === id);
    if (app?.status === "Approved") {
      toast.error("Cannot delete an approved application.");
      return;
    }
    if (window.confirm("Delete this application?")) {
      setApps(apps.filter((a) => a.id !== id));
      toast.success("Application deleted.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">My Applications</h1>
      <p className="text-muted-foreground">
        Track the status of your tuition applications
      </p>

      <div className="mt-6 space-y-4">
        {apps.map((app) => (
          <div
            key={app.id}
            className="card-elevated rounded-xl border bg-card p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <h3 className="font-heading text-lg font-semibold">
                  {app.tuitionSubject}
                </h3>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {app.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <DollarSign className="h-3.5 w-3.5" /> {app.expectedSalary}
                  </span>
                  <span>Applied: {app.appliedDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[app.status]}`}
                >
                  {app.status}
                </span>
                {app.status === "Pending" && (
                  <>
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDelete(app.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
