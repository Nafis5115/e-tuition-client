import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import {
  Menu,
  X,
  GraduationCap,
  User,
  LogIn,
  Loader2,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Tuitions", path: "/tuitions" },
  { name: "Tutors", path: "/tutors" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout, loading } = useAuth();
  const role = useRole();

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold">eTuition</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {!loading ? (
            user ? (
              //
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    to={
                      role === "student"
                        ? "/dashboard"
                        : role === "tutor"
                          ? "/dashboard/tutor"
                          : "/dashboard/admin"
                    }
                  >
                    <LayoutDashboard className="mr-1 h-4 w-4" /> Dashboard
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="mr-1 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="mr-1 h-4 w-4" /> Login
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">
                    <User className="mr-1 h-4 w-4" /> Register
                  </Link>
                </Button>
              </>
            )
          ) : (
            <Loader2 className="animate-spin w-6 h-6 text-primary" />
          )}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background px-4 pb-4 md:hidden animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            {!loading ? (
              user ? (
                //
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                      <LayoutDashboard className="mr-1 h-4 w-4" /> Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                  >
                    <LogOut className="mr-1 h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register" onClick={() => setMobileOpen(false)}>
                      Register
                    </Link>
                  </Button>
                </>
              )
            ) : (
              <Loader2 className="animate-spin w-6 h-6 text-primary" />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
