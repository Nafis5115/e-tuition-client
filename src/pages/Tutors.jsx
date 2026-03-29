import React from "react";
import { Link, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Star, Search } from "lucide-react";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";

const TutorsPage = () => {
  const axiosInstance = useAxios();
  const location = useLocation();
  const { data: tutors = [], isLoading: tutorLoading } = useQuery({
    queryKey: ["all-tutors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/all-tutors");
      return res.data;
    },
  });
  if (tutorLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="section-padding">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Our Tutors</h1>
        <p className="mt-1 text-muted-foreground">Find your ideal tutor</p>

        <div className="mt-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tutors by name or subject..."
            className="pl-10"
          />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tutors.map((t) => (
            <div
              key={t._id}
              className="card-elevated rounded-xl border bg-card p-5 text-center"
            >
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 font-heading text-xl font-bold text-primary">
                <img
                  src={t.photoURL}
                  alt=""
                  className="flex h-14 w-14  items-center justify-center rounded-full object-cover"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.subjects[0]}</p>
              <div className="mt-2 flex items-center justify-center gap-1 text-sm">
                <span className="text-muted-foreground">
                  📅 {t.experience} {t.experience > 1 ? "years" : "year"}
                </span>
              </div>
              <Button
                size="sm"
                className="mt-4 w-full"
                variant="outline"
                asChild
              >
                <Link
                  to={`/tutor-details/${t._id}`}
                  state={{ from: location.pathname }}
                >
                  View Profile
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorsPage;
