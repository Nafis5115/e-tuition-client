import { Button } from "../../../components/ui/button";
import { Edit, Trash2, MapPin, DollarSign, Loader2 } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstWord, formatDateWithMonth } from "../../../lib/utils";

const statusColor = {
  Approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: applications = [], isLoading: applicationLoading } = useQuery({
    queryKey: ["tutor-applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/get-tutor-applications?email=${user?.email}`,
      );
      return res.data;
    },
  });

  if (applicationLoading)
    return (
      <div className="flex justify-center text-center">
        <Loader2 className="animate-spin w-6 h-6 text-primary " />
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold">My Applications</h1>
      <p className="text-muted-foreground">
        Track the status of your tuition applications
      </p>

      <div className="mt-6 space-y-4">
        {applications.map((application) => (
          <div
            key={application._id}
            className="card-elevated rounded-xl border bg-card p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <h3 className="font-heading text-lg font-semibold">
                  {application?.tuition?.subject}
                </h3>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />{" "}
                    {application?.tuition?.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <DollarSign className="h-3.5 w-3.5" />{" "}
                    {application?.tuition?.budget}
                  </span>
                  <span>
                    Applied: {formatDateWithMonth(application.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[capitalizeFirstWord(application.status)]}`}
                >
                  {capitalizeFirstWord(application.status)}
                </span>
                {application.status === "pending" && (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
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
