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
  Menu,
  X,
} from "lucide-react";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState } from "react";

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
    path: "/dashboard/tutor/profile-settings",
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
    name: "Tutor Management",
    path: "/dashboard/admin/tutor-management",
    icon: Users,
  },
  {
    name: "Reports & Analytics",
    path: "/dashboard/admin/reports-analytics",
    icon: BarChart3,
  },
  // { name: "Settings", path: "/dashboard/admin/profile", icon: Settings },
];

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const links =
    role === "admin"
      ? adminLinks
      : role === "tutor"
        ? tutorLinks
        : studentLinks;

  const location = useLocation();

  if (roleLoading) return <LoadingSpinner />;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] relative">
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-card w-full absolute top-0 left-0 z-40">
        <button onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed md:static top-0 left-0 h-full w-64 bg-card border-r p-4 z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:block
      `}
      >
        <div className="flex items-center justify-between md:hidden mb-4">
          <p className="text-sm font-semibold uppercase text-muted-foreground">
            {role} Panel
          </p>
          <button onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="hidden md:block mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {role === "admin" ? "Admin" : role === "tutor" ? "Tutor" : "Student"}{" "}
          Panel
        </p>

        <nav className="space-y-1">
          {links.map((link) => (
            <RouterNavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
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

      <div className="flex-1 p-4 md:p-8 mt-14 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
