import { BookOpen, MapPin, User, Calendar } from "lucide-react";

const ongoing = [
  {
    id: 1,
    subject: "Mathematics",
    class: "Class 10",
    student: "Ahmed Rahman",
    location: "Dhanmondi, Dhaka",
    salary: "৳6,000/month",
    schedule: "Sun, Tue, Thu - 5PM",
    startDate: "2024-01-20",
  },
  {
    id: 2,
    subject: "Physics",
    class: "Class 12",
    student: "Kamal Uddin",
    location: "Gulshan, Dhaka",
    salary: "৳7,000/month",
    schedule: "Mon, Wed - 6PM",
    startDate: "2024-01-15",
  },
  {
    id: 3,
    subject: "English",
    class: "Class 8",
    student: "Nusrat Jahan",
    location: "Uttara, Dhaka",
    salary: "৳5,000/month",
    schedule: "Sat, Mon - 4PM",
    startDate: "2024-02-01",
  },
];

const OngoingTuitions = () => (
  <div>
    <h1 className="text-2xl font-bold">Ongoing Tuitions</h1>
    <p className="text-muted-foreground">All tuitions approved by students</p>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ongoing.map((t) => (
        <div
          key={t.id}
          className="card-elevated rounded-xl border bg-card p-5 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold">{t.subject}</h3>
              <p className="text-xs text-muted-foreground">{t.class}</p>
            </div>
          </div>
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> {t.student}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {t.location}
            </p>
            <p className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {t.schedule}
            </p>
          </div>
          <div className="border-t pt-3">
            <p className="text-sm font-semibold text-primary">{t.salary}</p>
            <p className="text-xs text-muted-foreground">Since {t.startDate}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default OngoingTuitions;
