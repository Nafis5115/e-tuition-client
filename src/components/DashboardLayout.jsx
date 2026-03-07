import { Outlet, NavLink as RouterNavLink, useLocation } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  CreditCard,
  Settings,
  FileText,
  BarChart3,
  UserCog,
  ClipboardList,
} from "lucide-react";
import useRole from "../hooks/useRole";

const studentLinks = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Tuitions", path: "/dashboard/my-tuitions", icon: BookOpen },
  { name: "Post Tuition", path: "/dashboard/post-tuition", icon: PlusCircle },
  { name: "Applied Tutors", path: "/dashboard/applied-tutors", icon: Users },
  { name: "Payments", path: "/dashboard/payments", icon: CreditCard },
  {
    name: "Profile Settings",
    path: "/dashboard/profile-settings",
    icon: Settings,
  },
];

const tutorLinks = [
  { name: "Dashboard", path: "/dashboard/tutor", icon: LayoutDashboard },
  {
    name: "My Applications",
    path: "/dashboard/tutor/my-applications",
    icon: ClipboardList,
  },
  {
    name: "Ongoing Tuitions",
    path: "/dashboard/tutor/ongoing-tuitions",
    icon: BookOpen,
  },
  {
    name: "Revenue History",
    path: "/dashboard/tutor/revenue-history",
    icon: CreditCard,
  },
  {
    name: "Profile Settings",
    path: "/dashboard/profile-settings",
    icon: Settings,
  },
];

const adminLinks = [
  { name: "Dashboard", path: "/dashboard/admin", icon: LayoutDashboard },
  {
    name: "User Management",
    path: "/dashboard/admin/user-management",
    icon: UserCog,
  },
  {
    name: "Tuition Management",
    path: "/dashboard/admin/tuition-management",
    icon: BookOpen,
  },
  {
    name: "Reports & Analytics",
    path: "/dashboard/admin/reports-analytics",
    icon: BarChart3,
  },
  { name: "Settings", path: "/dashboard/admin/profile", icon: Settings },
];

const DashboardLayout = () => {
  const role = useRole();
  const links =
    role === "admin"
      ? adminLinks
      : role === "tutor"
        ? tutorLinks
        : studentLinks;
  const location = useLocation();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-64 border-r bg-card p-4 md:block">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {role === "admin" ? "Admin" : role === "tutor" ? "Tutor" : "Student"}{" "}
          Panel
        </p>
        <nav className="space-y-1">
          {links.map((link) => (
            <RouterNavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </RouterNavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 p-4 md:p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
