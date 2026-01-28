import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from "@/layouts/layout";
import "./App.css";
import "./index.css";
import Popup from "@/components/ui/Popup";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";
import PublicRoute from "@/routes/PublicRoute";
import OutSource from "@/pages/landing/OutSource";
import Spinner from "@/components/ui/Spinner";

// Lazy pages
const Home = lazy(() => import("@/pages/landing/Home"));
const AllCourses = lazy(() => import("@/pages/courses/AllCourses"));
const CourseDetails = lazy(() => import("@/components/course-dashboard/CourseDetails"));
const ContactUs = lazy(() => import("@/features/landing/components/Contact"));
const Profile = lazy(() => import("@/pages/profile/Profile"));
const Signup = lazy(() => import("@/pages/landing/Signup"));
const CourseDashboard = lazy(() => import("@/pages/dashboard/CourseDashboard"));
const QuizList = lazy(() => import("@/components/course-dashboard/course-essentials/QuizList"));
const Projects = lazy(() => import("@/components/course-dashboard/course-essentials/Projects"));
const Resume = lazy(() => import("@/features/resume/Resume"));
const LearnInPublicPage = lazy(() => import("@/pages/dashboard/LearnInPublicPage"));

import GoogleCallback from "@/pages/landing/GoogleCallback";
import Blog from "@/pages/blogs/Blogs";
import BlogDetail from "@/features/blog/components/BlogDetail";
import Quiz from "./features/quiz/components/Quiz";
import PlayGround from "./pages/dashboard/PlayGround";
import ProjectList from "./features/projects/components/ProjectList";
import BountyList from "./features/bounties/components/BountyList";
import Courses from "./features/landing/pages/Courses";

function App() {
  const { checkAuth, loading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="text-white bg-neutral-900 min-h-screen">
      <Popup />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/course/:courseSlug" element={<CourseDetails />} />
            <Route path="/all-courses" element={<Courses/>} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/outsource" element={<OutSource />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />

            <Route path="/course-dashboard/:slug" element={<CourseDashboard />} />
            <Route path="/course-dashboard/:courseId/quiz" element={<QuizList />} />
            <Route path="/course-dashboard/:slug/quiz/:quizId" element={<Quiz />} />
            <Route path="/course-dashboard/:slug/lessons" element={<PlayGround />} />
            <Route path="/course-dashboard/:courseId/projects" element={<ProjectList />} />
            <Route path="/course-dashboard/projects/:projectId" element={<Projects />} />
            <Route path="/course-dashboard/:courseId/bounties" element={<BountyList />} />
            <Route path="/learn-in-public" element={<LearnInPublicPage />} />
            <Route path="/course-dashboard/resume" element={<Resume />} />

            <Route path="/api/v2/auth/google/callback" element={<GoogleCallback />} />

            <Route
              path="/signup"
              element={
                <PublicRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Signup />
                </PublicRoute>
              }
            />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
