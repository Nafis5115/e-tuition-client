import { Button } from "../../../components/ui/button";

import { Loader2, BookOpen, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

import UserTuitionCard from "../../../components/cards/tuition/UserTuitionCard";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading,
    refetch: tuitionRefetch,
  } = useQuery({
    queryKey: ["my-tuitions", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/get-user-tuitions?email=${user?.email}&page=${page}&limit=6`,
      );
      return res.data;
    },
  });

  const handleDeleteTuition = async (id) => {
    try {
      await axiosSecure.delete(`/api/delete-tuition/${id}`);
      const res = await tuitionRefetch();
      const updatedList = res.data?.data || [];
      if (updatedList.length === 0 && page > 1) {
        setPage((prev) => prev - 1);
      }
      toast.success("Tuition Deleted Successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.");
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

      {!isLoading ? (
        <div className="mt-6 space-y-4">
          {data.data?.map((tuition) => (
            <UserTuitionCard
              key={tuition._id}
              tuition={tuition}
              handleDeleteTuition={handleDeleteTuition}
            ></UserTuitionCard>
          ))}
          {data.data?.length === 0 && (
            <div className="rounded-xl border border-dashed bg-muted/30 p-12 text-center">
              <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 text-muted-foreground">
                No tuitions posted yet.
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
      {data?.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: data?.totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              size="icon"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            disabled={page === data?.totalPages}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyTuitions;
