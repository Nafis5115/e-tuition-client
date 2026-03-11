import React from "react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Link } from "react-router";
import {
  Edit,
  Trash2,
  Eye,
  MapPin,
  DollarSign,
  BookOpen,
  Loader2,
} from "lucide-react";
import { capitalizeFirstWord } from "../../../lib/utils";

const statusColor = {
  Approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const UserTuitionCard = ({ tuition }) => {
  return (
    <div className="card-elevated rounded-xl border bg-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold">
                {tuition.subject}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tuition.class} • {tuition.schedule}
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {tuition.location}
            </span>
            <span className="flex items-center gap-1 font-semibold text-primary">
              <DollarSign className="h-3.5 w-3.5" /> {tuition.budget}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[capitalizeFirstWord(tuition.status)]}`}
          >
            {capitalizeFirstWord(tuition.status)}
          </span>
          <Button size="icon" variant="ghost" asChild>
            <Link to={`/tuitions/${tuition._id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="icon" variant="ghost">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTuitionCard;
