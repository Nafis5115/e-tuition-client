import React, { useState } from "react";
import { useParams, Link, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import {
  MapPin,
  DollarSign,
  Clock,
  BookOpen,
  ArrowLeft,
  Calendar,
  Loader2,
} from "lucide-react";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatDateWithMonth } from "../lib/utils";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import TuitionApplyModal from "../components/modals/TuitionApplyModal";
import useRole from "../hooks/useRole";

const TuitionDetails = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [openDialog, setOpenDialog] = useState(false);
  const role = useRole();
  const {
    data: alreadyApplied = {},
    isLoading: checkAppliedLoading,
    refetch: appliedRefetch,
  } = useQuery({
    queryKey: ["check-alreadyApplied", id, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/check-alreadyApplied?tutorEmail=${user?.email}&tuitionId=${id}`,
      );
      return res.data;
    },
  });
  const { data: tuition = {}, isLoading: tuitionLoading } = useQuery({
    queryKey: ["tuition-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/tuition-details/${id}`);
      return res.data;
    },
  });

  const handleApply = async () => {
    try {
      await axiosSecure.post("/api/create-tutorApplication", {
        tuitionId: tuition._id,
        tutorEmail: user?.email,
      });
      toast.success("Successfully Applied For This Tuition.");
      setOpenDialog(false);
      appliedRefetch();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  if (tuitionLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <Link
          to={from}
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="card-elevated rounded-xl border bg-card p-6 md:p-8">
          <h1 className="text-2xl font-bold md:text-3xl">{tuition.subject}</h1>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 text-primary" /> {tuition.class}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> {tuition.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 text-primary" /> ৳{tuition.budget}{" "}
              /month
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" /> {tuition.schedule}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" /> Posted:{" "}
              {formatDateWithMonth(tuition.createdAt)}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-heading text-lg font-semibold">Description</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {tuition.description}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="font-heading text-lg font-semibold">Requirements</h2>
            <ul className="mt-2 space-y-1.5">
              {tuition.requirements?.map((req, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
          {!loading &&
            user?.email !== tuition.userEmail &&
            (role === "tutor" ? (
              !user?.email || checkAppliedLoading ? (
                <Button className="mt-8 w-full" size="lg" disabled>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Checking...
                </Button>
              ) : alreadyApplied?.applied ? (
                <Button variant="danger" className="mt-8 w-full" size="lg">
                  Already Applied
                </Button>
              ) : (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button className="mt-8 w-full" size="lg">
                      Apply as Tutor
                    </Button>
                  </DialogTrigger>

                  <TuitionApplyModal handleApply={handleApply} />
                </Dialog>
              )
            ) : (
              <Button
                variant="destructive"
                className="mt-8 w-full cursor-auto"
                size="lg"
              >
                You are not a tutor yet
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
