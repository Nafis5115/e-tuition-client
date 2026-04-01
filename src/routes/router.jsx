import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";

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

import StudentDashboard from "../pages/dashboard/student/StudentDashboard";
import TutorDashboard from "../pages/dashboard/tutor/TutorDashboard";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import AppliedTutors from "../pages/dashboard/student/AppliedTutors";
import MyApplications from "../pages/dashboard/tutor/MyApplications";
import MyTuitions from "../pages/dashboard/student/MyTuitions";
import OngoingTuitions from "../pages/dashboard/tutor/OngoingTuitions";
import Payments from "../pages/dashboard/student/Payments";
import PostTuition from "../pages/dashboard/student/PostTuition";
import ReportsAnalytics from "../pages/dashboard/admin/ReportsAnalytics";
import RevenueHistory from "../pages/dashboard/tutor/RevenueHistory";
import TuitionManagement from "../pages/dashboard/admin/TuitionManagement";
import UserManagement from "../pages/dashboard/admin/UserManagement";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import StudentProfileSettings from "../pages/dashboard/student/StudentProfileSettings";
import TutorProfileSettings from "../pages/dashboard/tutor/TutorProfileSettings";
import EditTuition from "../pages/dashboard/student/EditTuition";
import TutorManagement from "../pages/dashboard/admin/TutorManagement";

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
        path: "tuition-details/:id",
        Component: TuitionDetails,
      },
      {
        path: "tutors",
        Component: TutorsPage,
      },
      {
        path: "tutor-details/:id",
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
        element: (
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
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
            path: "edit-tuition/:id",
            Component: EditTuition,
          },
          {
            path: "payments",
            Component: Payments,
          },

          {
            path: "profile-settings",
            Component: StudentProfileSettings,
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
              {
                path: "profile-settings",
                Component: TutorProfileSettings,
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
              {
                path: "tutor-management",
                Component: TutorManagement,
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
