import { Button } from "../../../components/ui/button";

import { Loader2, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import UserTuitionCard from "../../../components/cards/tuition/UserTuitionCard";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["my-tuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/get-user-tuitions?email=${user?.email}`,
      );
      return res.data;
    },
  });

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

      {!isLoading ? (
        <div className="mt-6 space-y-4">
          {tuitions.map((tuition) => (
            <UserTuitionCard
              key={tuition._id}
              tuition={tuition}
            ></UserTuitionCard>
          ))}
          {tuitions.length === 0 && (
            <div className="rounded-xl border border-dashed bg-muted/30 p-12 text-center">
              <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 text-muted-foreground">
                No tuitions posted yetuition.
              </p>
              <Button className="mt-4" asChild>
                <Link to="/dashboard/post-tuition">
                  Post Your First Tuition
                </Link>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center text-center">
          <Loader2 className="animate-spin w-6 h-6 text-primary " />
        </div>
      )}
    </div>
  );
};

export default MyTuitions;
