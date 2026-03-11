import { useState } from "react";

import { Button } from "../../../components/ui/button";
import { CheckCircle, XCircle, Star } from "lucide-react";
import { toast } from "sonner";

const initialApplications = [
  {
    id: 1,
    tutorName: "Dr. Rafiq Ahmed",
    avatar: "RA",
    qualifications: "PhD Mathematics, DU",
    experience: "8 years",
    expectedSalary: "৳6,000/month",
    tuitionSubject: "Mathematics - Class 10",
    status: "Pending",
    rating: 4.9,
  },
  {
    id: 2,
    tutorName: "Arif Hossain",
    avatar: "AH",
    qualifications: "MSc Physics, BUET",
    experience: "6 years",
    expectedSalary: "৳5,500/month",
    tuitionSubject: "Mathematics - Class 10",
    status: "Pending",
    rating: 4.7,
  },
  {
    id: 3,
    tutorName: "Fatima Khan",
    avatar: "FK",
    qualifications: "MA English, JU",
    experience: "5 years",
    expectedSalary: "৳5,000/month",
    tuitionSubject: "English - Class 8",
    status: "Approved",
    rating: 4.8,
  },
];

const AppliedTutors = () => {
  const [applications, setApplications] = useState(initialApplications);

  const handleApprove = (id) => {
    toast.success("Redirecting to payment page...");
    setApplications(
      applications.map((a) =>
        a.id === id
          ? { ...a, status: "Approved" }
          : a.tuitionSubject ===
              applications.find((x) => x.id === id)?.tuitionSubject
            ? { ...a, status: "Rejected" }
            : a,
      ),
    );
  };

  const handleReject = (id) => {
    setApplications(
      applications.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a)),
    );
    toast.info("Application rejected.");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Applied Tutors</h1>
      <p className="text-muted-foreground">
        Review tutor applications for your tuition posts
      </p>

      <div className="mt-6 space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="card-elevated rounded-xl border bg-card p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-lg font-bold text-primary">
                {app.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-lg font-semibold">
                  {app.tutorName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  For: {app.tuitionSubject}
                </p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span>🎓 {app.qualifications}</span>
                  <span>📅 {app.experience}</span>
                  <span className="font-semibold text-primary">
                    💰 {app.expectedSalary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />{" "}
                    {app.rating}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {app.status === "Pending" ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(app.id)}
                      className="gap-1"
                    >
                      <CheckCircle className="h-4 w-4" /> Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-destructive"
                      onClick={() => handleReject(app.id)}
                    >
                      <XCircle className="h-4 w-4" /> Reject
                    </Button>
                  </>
                ) : (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${app.status === "Approved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}
                  >
                    {app.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedTutors;
