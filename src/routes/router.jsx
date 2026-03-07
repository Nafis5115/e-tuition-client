import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";

import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import TuitionsPage from "../pages/Tuitions";
import TuitionDetails from "../pages/TuitionDetails";
import TutorsPage from "../pages/Tutors";
import TutorProfile from "../pages/TutorProfile";
import AboutPage from "../pages/About";
import ContactPage from "../pages/Contact";

import StudentDashboard from "../pages/dashboard/StudentDashboard";
import TutorDashboard from "../pages/dashboard/TutorDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Index,
      },
      {
        path: "tuitions",
        Component: TuitionsPage,
      },
      {
        path: "tuitions/:id",
        Component: TuitionDetails,
      },
      {
        path: "tutors",
        Component: TutorsPage,
      },
      {
        path: "tutors/:id",
        Component: TutorProfile,
      },
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "dashboard",
        Component: StudentDashboard,
      },
      {
        path: "dashboard/tutor",
        Component: TutorDashboard,
      },
      {
        path: "dashboard/admin",
        Component: AdminDashboard,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
