import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import Popup from "@/components/ui/Popup";
import Spinner from "@/components/ui/Spinner";
import ScrollToTop from "./components/common/ScrollToTop";
import AuthRedirectHandler from "./components/common/AuthRedirectHandler";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";
import MentorRoute from "./routes/MentorRoute";
import { useAuthStore } from "@/store/authStore";
import LandingLayout from "./layouts/LandingLayout";
import AppLayout from "./layouts/AppLayout";
import MentorLayout from "./layouts/MentorLayout";
import GoogleCallback from "@/pages/landing/GoogleCallback";
import Blog from "@/pages/blogs/Blogs";
import BlogDetail from "@/features/blog/components/BlogDetail";
import Quiz from "./features/quiz/components/Quiz";
import PlayGround from "./features/playground/PlayGround";
import Courses from "./features/landing/pages/Courses";
import RealDashboardPage from "./features/dashboard/pages/RealDashboardPage";
import Bounties from "./features/bounties/Bounties";
import Certificate from "./features/certificate/Certificate";
import MentorDashboard from "./features/mentor/pages/Dashboard";
import MentorLogin from "./pages/mentors/Login";
import VerifyCertificatePage from "./features/certificate/components/VerifyCertificatePage";
import SearchByCertificate from "./features/certificate/components/SearchByCertificate";
import ProjectSolutionsPage from "./features/mentor/pages/ProjectSolutionsPage";
import StudentPerformancePage from "./features/mentor/pages/StudentPerformancePage";
import MentorQuestionsPage from "./features/mentor/pages/Questions";
import Resume from "./features/resume/Resume";
import NotFound from "./pages/NotFound";
import MentorHomeRedirect from "./features/mentor/pages/MentorHomeRedirect";
import MentorSelectCoursePage from "./features/mentor/pages/MentorSelectCoursePage";
import MentorNoCoursePage from "./features/mentor/pages/MentorNoCoursePage";
import MentorCourseRoute from "./routes/MentorCourseRoute";
import MentorCourseLayout from "./features/mentor/layouts/MentorCourseLayout";

const Home = lazy(() => import("@/pages/landing/Home"));
const CourseDetails = lazy(() => import("@/features/landing/pages/AboutCourse"));
const ContactUs = lazy(() => import("@/features/landing/components/Contact"));
const CareersPage = lazy(() => import("@/features/careers/pages/CareersPage"));
const Profile = lazy(() => import("@/features/landing/pages/Profile"));
const Signup = lazy(() => import("@/pages/landing/Signup"));
const DemoDashboardPage = lazy(() => import("@/features/dashboard/pages/DemoDashboardPage"));
const QuizList = lazy(() => import("@/features/quiz/QuizList"));
const Projects = lazy(() => import("@/features/projects/components/Project"));
const LearnInPublicPage = lazy(
  () => import("@/features/dashboard/sections/learn-in-public/LearninPublicPage")
);

function App() {
  const { checkAuth, loading, isAuthenticated } = useAuthStore();
  const { pathname } = useLocation();

  const shouldHidePopup = [
    "/profile",
    "/course-dashboard",
    "/mentor",
    "/check-certificate",
    "/certificate/verify",
  ].some((path) => pathname.startsWith(path));

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-white text-white dark:bg-neutral-900">
      {!shouldHidePopup && <Popup mode={isAuthenticated ? "real" : "demo"} />}

      <AuthRedirectHandler />
      <ScrollToTop />

      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/course/:courseSlug" element={<CourseDetails />} />
            <Route path="/all-courses" element={<Courses />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/check-certificate" element={<SearchByCertificate />} />
            <Route path="/certificate/verify/:cid" element={<VerifyCertificatePage />} />
            <Route path="/api/v2/auth/google/callback" element={<GoogleCallback />} />

            <Route path="/course/:slug/demo" element={<DemoDashboardPage />} />
            <Route path="/course/:slug/demo/lessons" element={<PlayGround mode="demo" />} />
            <Route path="/course/:slug/demo/play" element={<PlayGround mode="demo" />} />
            <Route path="/course/:slug/demo/quiz" element={<QuizList mode="demo" />} />
            <Route path="/course/:slug/demo/quiz/play" element={<Quiz mode="demo" />} />
            <Route path="/course/:slug/demo/quiz/:quizId" element={<Quiz mode="demo" />} />
            <Route path="/course/:slug/demo/projects" element={<Projects  />} />
            <Route path="/course/:slug/demo/bounties" element={<Bounties />} />
            <Route path="/course/:slug/demo/learn-in-public" element={<LearnInPublicPage />} />
            <Route path="/course/:slug/demo/resume" element={<Resume mode="demo" />} />


            <Route
              path="/login"
              element={
                <PublicRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Signup />
                </PublicRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <PublicRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Signup />
                </PublicRoute>
              }
            />

            <Route
              path="/mentor/login"
              element={
                <PublicRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <MentorLogin />
                </PublicRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/course-dashboard/:slug" element={<RealDashboardPage />} />
              <Route path="/course-dashboard/:slug/lessons" element={<PlayGround mode="real" />} />
              <Route path="/course-dashboard/:slug/quiz" element={<QuizList mode="real" />} />
              <Route path="/course-dashboard/:slug/quiz/play" element={<Quiz mode="real" />} />
              <Route path="/course-dashboard/:slug/quiz/:quizId" element={<Quiz mode="real" />} />
              <Route path="/course-dashboard/:slug/projects" element={<Projects  />} />
              <Route path="/course-dashboard/:slug/bounties" element={<Bounties />} />
              <Route path="/course-dashboard/:slug/resume" element={<Resume mode="real" />} />
              <Route path="/course-dashboard/learn-in-public" element={<LearnInPublicPage />} />


              <Route
                path="/course-dashboard/:slug/download-certificates"
                element={<Certificate />}
              />
            </Route>

            <Route element={<MentorRoute />}>
              <Route element={<MentorLayout />}>
                <Route path="/mentor" element={<MentorHomeRedirect />} />
                <Route path="/mentor/dashboard" element={<Navigate to="/mentor" replace />} />
                <Route path="/mentor/select-course" element={<MentorSelectCoursePage />} />
                <Route path="/mentor/no-course" element={<MentorNoCoursePage />} />
                <Route element={<MentorCourseRoute />}>
                  <Route element={<MentorCourseLayout />}>
                    <Route
                      path="/mentor/course/:courseId"
                      element={<MentorHomeRedirect />}
                    />
                    <Route path="/mentor/course/:courseId/projects" element={<MentorDashboard />} />
                    <Route
                      path="/mentor/course/:courseId/projects/solutions"
                      element={<ProjectSolutionsPage />}
                    />
                    <Route
                      path="/mentor/course/:courseId/questions"
                      element={<MentorQuestionsPage />}
                    />
                    <Route
                      path="/mentor/course/:courseId/performance"
                      element={<StudentPerformancePage />}
                    />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
