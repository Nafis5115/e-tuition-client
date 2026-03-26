import { Button } from "../../../components/ui/button";
import { CheckCircle, XCircle, Star, Eye } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstWord } from "../../../lib/utils";

const AppliedTutors = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: appliedTutors = [] } = useQuery({
    queryKey: ["applied-tutors", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/get-applied-tutors?email=${user?.email}`,
      );
      return res.data;
    },
  });
  return (
    <div>
      <h1 className="text-2xl font-bold">Applied Tutors</h1>
      <p className="text-muted-foreground">
        Review tutor applications for your tuition posts
      </p>

      <div className="mt-6 space-y-4">
        {appliedTutors.map((tutor) => (
          <div
            key={tutor._id}
            className="card-elevated rounded-xl border bg-card p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-lg font-bold text-primary">
                <img
                  src={tutor.photoURL}
                  alt=""
                  className="flex h-14 w-14  items-center justify-center rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-lg font-semibold">
                  {tutor.tutorName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  For: {tutor.subject}
                </p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span>📅 {tutor.experience} years</span>
                  <span className="font-semibold text-primary">
                    💰 {tutor.budget}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="gap-1" asChild>
                  <Link to={`/dashboard/applied-tutor/${tutor._id}`}>
                    <Eye className="h-4 w-4" /> View
                  </Link>
                </Button>
                {tutor.status === "pending" ? (
                  <>
                    <Button size="sm" className="gap-1">
                      <CheckCircle className="h-4 w-4" /> Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-destructive"
                    >
                      <XCircle className="h-4 w-4" /> Reject
                    </Button>
                  </>
                ) : (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${tutor.status === "Approved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}
                  >
                    {capitalizeFirstWord(tutor.status)}
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
