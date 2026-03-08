import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";

import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/Login";
import Register from "../pages/Register";
import TuitionsPage from "../pages/Tuitions";
import TuitionDetails from "../pages/TuitionDetails";
import TutorsPage from "../pages/Tutors";
import TutorProfile from "../pages/TutorProfile";
import AboutPage from "../pages/About";
import ContactPage from "../pages/Contact";

import StudentDashboard from "../pages/dashboard/StudentDashboard";
import TutorDashboard from "../pages/dashboard/TutorDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import AppliedTutors from "../pages/dashboard/AppliedTutors";
import MyApplications from "../pages/dashboard/MyApplications";
import MyTuitions from "../pages/dashboard/MyTuitions";
import OngoingTuitions from "../pages/dashboard/OngoingTuitions";
import Payments from "../pages/dashboard/Payments";
import PostTuition from "../pages/dashboard/PostTuition";
import ProfileSettings from "../pages/dashboard/ProfileSettings";
import ReportsAnalytics from "../pages/dashboard/ReportsAnalytics";
import RevenueHistory from "../pages/dashboard/RevenueHistory";
import TuitionManagement from "../pages/dashboard/TuitionManagement";
import UserManagement from "../pages/dashboard/UserManagement";
import DashboardLayout from "../components/DashboardLayout";

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
        Component: Register,
      },
      {
        path: "dashboard",
        Component: DashboardLayout,
        children: [
          {
            path: "",
            Component: StudentDashboard,
          },
          {
            path: "my-tuitions",
            Component: MyTuitions,
          },

          {
            path: "applied-tutors",
            Component: AppliedTutors,
          },

          {
            path: "post-tuition",
            Component: PostTuition,
          },
          {
            path: "payments",
            Component: Payments,
          },

          {
            path: "profile-settings",
            Component: ProfileSettings,
          },
          {
            path: "tutor",
            children: [
              {
                path: "",
                Component: TutorDashboard,
              },
              {
                path: "my-applications",
                Component: MyApplications,
              },

              {
                path: "ongoing-tuitions",
                Component: OngoingTuitions,
              },
              {
                path: "revenue-history",
                Component: RevenueHistory,
              },
            ],
          },
          {
            path: "admin",
            children: [
              {
                path: "",
                Component: AdminDashboard,
              },

              {
                path: "reports-analytics",
                Component: ReportsAnalytics,
              },
              {
                path: "tuition-management",
                Component: TuitionManagement,
              },
              {
                path: "user-management",
                Component: UserManagement,
              },
            ],
          },
        ],
      },

      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
