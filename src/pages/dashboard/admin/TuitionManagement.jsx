import { Button } from "../../../components/ui/button";
import { CheckCircle, XCircle, MapPin, DollarSign } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstWord } from "../../../lib/utils";
import LoadingSpinner from "../../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { useState } from "react";

const statusColor = {
  Approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Assigned: "bg-accent text-white",
};

const TuitionManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [updateStatusLoading, setUpdateStatusLoading] = useState(false);
  const {
    data: tuitions = [],
    isLoading: tuitionLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-tuitions-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/all-tuitions");
      return res.data;
    },
  });

  const handleStatus = async (id, status) => {
    setUpdateStatusLoading(true);
    await axiosSecure
      .patch(`/api/manage-tuition/${id}`, { status })
      .then(async (res) => {
        if (res.data.modifiedCount) {
          await refetch();
          setUpdateStatusLoading(false);
          toast.success(`Successfully ${capitalizeFirstWord(status)} Tuition.`);
        }
      })
      .catch((e) => console.log(e));
  };

  if (tuitionLoading || updateStatusLoading)
    return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Tuition Management</h1>
      <p className="text-muted-foreground">Review and manage tuition posts</p>

      <div className="mt-6 space-y-4">
        {tuitions.map((t) => (
          <div
            key={t._id}
            className="card-elevated rounded-xl border bg-card p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-lg font-semibold">
                    {t.subject}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    ({t.class})
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {t.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <DollarSign className="h-3.5 w-3.5" /> {t.budget}
                  </span>
                  <span>By: {t.tutorName}</span>
                  <span>{t.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[capitalizeFirstWord(t.status)]}`}
                >
                  {capitalizeFirstWord(t.status)}
                </span>
                {t.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      className="gap-1"
                      onClick={() => handleStatus(t._id, "approved")}
                    >
                      <CheckCircle className="h-4 w-4" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-destructive"
                      onClick={() => handleStatus(t._id, "rejected")}
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
