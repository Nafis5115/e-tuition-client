import React from "react";
import { useParams, Link } from "react-router";
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
import { capitalizeFirstWord, formatDateWithMonth } from "../lib/utils";

const TuitionDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { data: tuition = {}, isLoading } = useQuery({
    queryKey: ["tuition-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/tuition-details/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <Link
          to="/tuitions"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Tuitions
        </Link>

        <div className="card-elevated rounded-xl border bg-card p-6 md:p-8">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {capitalizeFirstWord(tuition.status)}
          </div>

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

          <Button className="mt-8 w-full" size="lg">
            Apply as Tutor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
