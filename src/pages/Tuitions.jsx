import React, { useEffect } from "react";
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
import useAxios from "../hooks/useAxios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";

const TuitionsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [sort, setSort] = useState("");
  const axiosInstance = useAxios();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "all-approved-user-tuitions",
      page,
      debouncedSearch,
      sort,
      selectedClass,
    ],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/all-tuitions?page=${page}&limit=8&class=${selectedClass}&sort=${sort}&search=${debouncedSearch}`,
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
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
          <Select onValueChange={(val) => setSelectedClass(val)}>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-1 h-4 w-4" />
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              {[8, 9, 10, 11, 12].map((c) => (
                <SelectItem key={c} value={`Class ${c}`}>
                  Class {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(val) => setSort(val)}>
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
          {data.tuitions.map((t) => (
            <div
              key={t._id}
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
        {isFetching && (
          <div className="flex justify-center mt-4">
            <LoadingSpinner />
          </div>
        )}
        {data.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: data.totalPages }, (_, i) => (
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
              disabled={page === data.totalPages}
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
