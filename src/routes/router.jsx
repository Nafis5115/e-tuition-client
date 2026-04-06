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
import PaymentSuccess from "../pages/dashboard/student/PaymentSuccess";
import PaymentCancel from "../pages/dashboard/student/PaymentCancel";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import AdminRoute from "./AdminRoute";
import ForgotPassword from "../pages/ForgotPassword";

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
        path: "tutor-details/:email",
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
        path: "forgot-password",
        Component: ForgotPassword,
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
            element: (
              <StudentRoute>
                <StudentDashboard></StudentDashboard>
              </StudentRoute>
            ),
          },
          {
            path: "my-tuitions",
            element: (
              <StudentRoute>
                <MyTuitions></MyTuitions>
              </StudentRoute>
            ),
          },

          {
            path: "applied-tutors",
            element: (
              <StudentRoute>
                <AppliedTutors></AppliedTutors>
              </StudentRoute>
            ),
          },

          {
            path: "post-tuition",
            element: (
              <StudentRoute>
                <PostTuition></PostTuition>
              </StudentRoute>
            ),
          },
          {
            path: "edit-tuition/:id",
            element: (
              <StudentRoute>
                <EditTuition></EditTuition>
              </StudentRoute>
            ),
          },
          {
            path: "payments",
            element: (
              <StudentRoute>
                <Payments></Payments>
              </StudentRoute>
            ),
          },
          {
            path: "payment-success",
            element: (
              <StudentRoute>
                <PaymentSuccess></PaymentSuccess>
              </StudentRoute>
            ),
          },
          {
            path: "payment-cancelled",
            element: (
              <StudentRoute>
                <PaymentCancel></PaymentCancel>
              </StudentRoute>
            ),
          },

          {
            path: "profile-settings",
            element: (
              <StudentRoute>
                <StudentProfileSettings></StudentProfileSettings>
              </StudentRoute>
            ),
          },
          {
            path: "tutor",
            children: [
              {
                path: "",
                element: (
                  <TutorRoute>
                    <TutorDashboard></TutorDashboard>
                  </TutorRoute>
                ),
              },
              {
                path: "my-applications",
                element: (
                  <TutorRoute>
                    <MyApplications></MyApplications>
                  </TutorRoute>
                ),
              },

              {
                path: "ongoing-tuitions",
                element: (
                  <TutorRoute>
                    <OngoingTuitions></OngoingTuitions>
                  </TutorRoute>
                ),
              },
              {
                path: "revenue-history",
                element: (
                  <TutorRoute>
                    <RevenueHistory></RevenueHistory>
                  </TutorRoute>
                ),
              },
              {
                path: "profile-settings",
                element: (
                  <TutorRoute>
                    <TutorProfileSettings></TutorProfileSettings>
                  </TutorRoute>
                ),
              },
            ],
          },
          {
            path: "admin",
            children: [
              {
                path: "",
                element: (
                  <AdminRoute>
                    <AdminDashboard></AdminDashboard>
                  </AdminRoute>
                ),
              },

              {
                path: "reports-analytics",
                element: (
                  <AdminRoute>
                    <ReportsAnalytics></ReportsAnalytics>
                  </AdminRoute>
                ),
              },
              {
                path: "tuition-management",
                element: (
                  <AdminRoute>
                    <TuitionManagement></TuitionManagement>
                  </AdminRoute>
                ),
              },
              {
                path: "user-management",
                element: (
                  <AdminRoute>
                    <UserManagement></UserManagement>
                  </AdminRoute>
                ),
              },
              {
                path: "tutor-management",
                element: (
                  <AdminRoute>
                    <TutorManagement></TutorManagement>
                  </AdminRoute>
                ),
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
