import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Search,
  MapPin,
  DollarSign,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const allTuitions = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  subject: [
    "Mathematics",
    "Physics",
    "English",
    "Chemistry",
    "Biology",
    "Bangla",
    "ICT",
    "Economics",
  ][i % 8],
  class: `Class ${8 + (i % 5)}`,
  location:
    [
      "Dhanmondi",
      "Gulshan",
      "Uttara",
      "Mirpur",
      "Banani",
      "Mohammadpur",
      "Lalmatia",
      "Bashundhara",
    ][i % 8] + ", Dhaka",
  budget: `৳${4000 + (i % 4) * 500}/month`,
  status: "Approved",
  schedule: ["Sat-Mon-Wed", "Sun-Tue-Thu", "Daily", "Fri-Sat"][i % 4],
}));

const TuitionsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = allTuitions.filter(
    (t) =>
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="section-padding">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Browse Tuitions</h1>
        <p className="mt-1 text-muted-foreground">
          Find the perfect tuition opportunity
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by subject or location..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-1 h-4 w-4" />
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              {[8, 9, 10, 11, 12].map((c) => (
                <SelectItem key={c} value={`${c}`}>
                  Class {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="budget-asc">Budget: Low-High</SelectItem>
              <SelectItem value="budget-desc">Budget: High-Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {paginated.map((t) => (
            <div
              key={t.id}
              className="card-elevated rounded-xl border bg-card p-5"
            >
              <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {t.status}
              </div>
              <h3 className="font-heading text-lg font-semibold">
                {t.subject}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.class} • {t.schedule}
              </p>
              <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {t.location}
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-primary">
                <DollarSign className="h-3.5 w-3.5" /> {t.budget}
              </div>
              <Button
                size="sm"
                className="mt-4 w-full"
                variant="outline"
                asChild
              >
                <Link to={`/tuitions/${t.id}`}>View Details</Link>
              </Button>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
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
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TuitionsPage;
