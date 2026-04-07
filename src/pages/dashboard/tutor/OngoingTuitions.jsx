import { BookOpen, MapPin, User, Calendar } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { formatDateWithMonth } from "../../../lib/utils";
import LoadingSpinner from "../../../components/LoadingSpinner";

const OngoingTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: ongoingTuitions = [], isLoading } = useQuery({
    queryKey: ["tutor-ongoing-tuitions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/tutor-ongoing-tuitions?email=${user?.email}`,
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className="text-2xl font-bold">Ongoing Tuitions</h1>
      <p className="text-muted-foreground">All tuitions approved by students</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ongoingTuitions.map((t) => (
          <div
            key={t._id}
            className="card-elevated rounded-xl border bg-card p-5 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold">{t.subject}</h3>
                <p className="text-xs text-muted-foreground">{t.class}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> {t.studentName}
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {t.location}
              </p>
              <p className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {t.schedule}
              </p>
            </div>
            <div className="border-t pt-3">
              <p className="text-sm font-semibold text-primary">৳{t.budget}</p>
              <p className="text-xs text-muted-foreground">
                Since {formatDateWithMonth(t.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingTuitions;
