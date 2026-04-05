import React from "react";
import { useParams, Link, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { Star, BookOpen, Clock, MapPin, ArrowLeft, Award } from "lucide-react";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";

const TutorProfile = () => {
  const { email } = useParams();
  const axiosInstance = useAxios();

  const location = useLocation();
  const from = location.state?.from || "/";
  const { data: tutor = {}, isLoading: tutorLoading } = useQuery({
    queryKey: ["tutor-details", email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/tutor-details/${email}`);
      return res.data;
    },
  });
  if (tutorLoading) return <LoadingSpinner></LoadingSpinner>;
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
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <img
              src={tutor.photoURL}
              alt=""
              className="flex h-14 w-14  items-center justify-center rounded-full object-cover"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">{tutor.name}</h1>

              <div className="mt-2 flex items-center justify-center gap-3 text-sm sm:justify-start">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-primary" /> {tutor.experience}{" "}
                  years
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" /> {tutor.location}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-heading text-lg font-semibold">About</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {tutor.about}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="font-heading text-lg font-semibold">
              Qualifications
            </h2>
            <ul className="mt-2 space-y-1.5">
              {tutor?.qualifications?.map((q, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Award className="h-4 w-4 text-primary flex-shrink-0" /> {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="font-heading text-lg font-semibold">Subjects</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {tutor?.subjects?.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          {/* 
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-primary">
                {tutor.totalStudents}+
              </p>
              <p className="text-xs text-muted-foreground">Students Taught</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-primary">
                {tutor.expectedSalary}
              </p>
              <p className="text-xs text-muted-foreground">Expected Salary</p>
            </div>
          </div> */}

          <Button className="mt-8 w-full" size="lg">
            Contact Tutor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
