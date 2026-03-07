import React from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Star, Search } from "lucide-react";

const tutors = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: [
    "Dr. Rafiq Ahmed",
    "Fatima Khan",
    "Arif Hossain",
    "Nusrat Jahan",
    "Kamal Uddin",
    "Sabrina Akter",
    "Tanvir Islam",
    "Reshma Begum",
    "Imran Ali",
    "Priya Das",
    "Shakil Mahmud",
    "Maliha Rahman",
  ][i],
  subject: [
    "Mathematics",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Bangla",
    "ICT",
    "Economics",
    "Mathematics",
    "English",
    "Physics",
    "Chemistry",
  ][i],
  rating: (4.5 + (i % 5) * 0.1).toFixed(1),
  experience: `${3 + (i % 6)} years`,
  avatar: [
    "RA",
    "FK",
    "AH",
    "NJ",
    "KU",
    "SA",
    "TI",
    "RB",
    "IA",
    "PD",
    "SM",
    "MR",
  ][i],
}));

const TutorsPage = () => {
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
              key={t.id}
              className="card-elevated rounded-xl border bg-card p-5 text-center"
            >
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 font-heading text-xl font-bold text-primary">
                {t.avatar}
              </div>
              <h3 className="font-heading text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.subject}</p>
              <div className="mt-2 flex items-center justify-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">{t.rating}</span>
                <span className="text-muted-foreground">• {t.experience}</span>
              </div>
              <Button
                size="sm"
                className="mt-4 w-full"
                variant="outline"
                asChild
              >
                <Link to={`/tutors/${t.id}`}>View Profile</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorsPage;
