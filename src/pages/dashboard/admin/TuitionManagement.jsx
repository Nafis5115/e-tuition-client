import { useState } from "react";

import { Button } from "../../../components/ui/button";
import { CheckCircle, XCircle, MapPin, DollarSign } from "lucide-react";
import { toast } from "sonner";

const initialPosts = [
  {
    id: 1,
    subject: "Mathematics",
    class: "Class 10",
    location: "Dhanmondi, Dhaka",
    budget: "৳5,000/month",
    postedBy: "Ahmed Rahman",
    status: "Pending",
    date: "2024-01-20",
  },
  {
    id: 2,
    subject: "Physics",
    class: "Class 12",
    location: "Gulshan, Dhaka",
    budget: "৳6,000/month",
    postedBy: "Kamal Uddin",
    status: "Pending",
    date: "2024-01-22",
  },
  {
    id: 3,
    subject: "English",
    class: "Class 8",
    location: "Uttara, Dhaka",
    budget: "৳4,000/month",
    postedBy: "Nusrat Jahan",
    status: "Approved",
    date: "2024-01-18",
  },
  {
    id: 4,
    subject: "Chemistry",
    class: "Class 11",
    location: "Mirpur, Dhaka",
    budget: "৳5,500/month",
    postedBy: "Rina Begum",
    status: "Rejected",
    date: "2024-01-15",
  },
];

const statusColor = {
  Approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const TuitionManagement = () => {
  const [posts, setPosts] = useState(initialPosts);

  const updateStatus = (id, status) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, status } : p)));
    toast.success(`Tuition post ${status.toLowerCase()}.`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Tuition Management</h1>
      <p className="text-muted-foreground">Review and manage tuition posts</p>

      <div className="mt-6 space-y-4">
        {posts.map((p) => (
          <div
            key={p.id}
            className="card-elevated rounded-xl border bg-card p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-lg font-semibold">
                    {p.subject}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    ({p.class})
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {p.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <DollarSign className="h-3.5 w-3.5" /> {p.budget}
                  </span>
                  <span>By: {p.postedBy}</span>
                  <span>{p.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[p.status]}`}
                >
                  {p.status}
                </span>
                {p.status === "Pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateStatus(p.id, "Approved")}
                      className="gap-1"
                    >
                      <CheckCircle className="h-4 w-4" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-destructive"
                      onClick={() => updateStatus(p.id, "Rejected")}
                    >
                      <XCircle className="h-4 w-4" /> Reject
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

export default TuitionManagement;
