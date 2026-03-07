import React from "react";
import { useParams, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Star, BookOpen, Clock, MapPin, ArrowLeft, Award } from "lucide-react";

const TutorProfile = () => {
  const { id } = useParams();

  const tutor = {
    id,
    name: "Dr. Rafiq Ahmed",
    subject: "Mathematics",
    rating: 4.9,
    experience: "8 years",
    avatar: "RA",
    bio: "Experienced mathematics tutor with a PhD from Dhaka University. Specializing in SSC and HSC level math with a proven track record of helping students achieve top grades.",
    qualifications: [
      "PhD in Mathematics, Dhaka University",
      "M.Sc in Applied Mathematics",
      "B.Sc (Hons) in Mathematics",
    ],
    subjects: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics"],
    location: "Dhanmondi, Dhaka",
    totalStudents: 120,
    expectedSalary: "৳6,000/month",
  };

  return (
    <div className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <Link
          to="/tutors"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Tutors
        </Link>

        <div className="card-elevated rounded-xl border bg-card p-6 md:p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-heading text-3xl font-bold text-primary">
              {tutor.avatar}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">{tutor.name}</h1>
              <p className="text-muted-foreground">
                {tutor.subject} Specialist
              </p>
              <div className="mt-2 flex items-center justify-center gap-3 text-sm sm:justify-start">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />{" "}
                  {tutor.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-primary" /> {tutor.experience}
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
              {tutor.bio}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="font-heading text-lg font-semibold">
              Qualifications
            </h2>
            <ul className="mt-2 space-y-1.5">
              {tutor.qualifications.map((q, i) => (
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
              {tutor.subjects.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

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
          </div>

          <Button className="mt-8 w-full" size="lg">
            Contact Tutor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
