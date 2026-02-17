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
const CourseDetails = lazy(() => import("@/features/landing/pages/AboutCourse"));
const ContactUs = lazy(() => import("@/features/landing/components/Contact"));
const Profile = lazy(() => import("@/features/landing/pages/Profile"));
const Signup = lazy(() => import("@/pages/landing/Signup"));
const DemoDashboardPage  = lazy(() => import("@/features/dashboard/pages/DemoDashboardPage"));
const QuizList = lazy(() => import("@/features/quiz/QuizList"));
const Projects = lazy(() => import("@/features/projects/components/Project"));
const Resume = lazy(() => import("@/features/resume/Resume"));
const LearnInPublicPage = lazy(() => import("@/features/dashboard/sections/learn-in-public/LearninPublicPage"));

import GoogleCallback from "@/pages/landing/GoogleCallback";
import Blog from "@/pages/blogs/Blogs";
import BlogDetail from "@/features/blog/components/BlogDetail";
import Quiz from "./features/quiz/components/Quiz";
import PlayGround from "./features/playground/PlayGround";

import Courses from "./features/landing/pages/Courses";
import RealDashboardPage from "./features/dashboard/pages/RealDashboardPage";
import ScrollToTop from "./components/common/ScrollToTop";
import Bounties from "./features/bounties/Bounties";
import Certificate from "./features/certificate/Certificate";
// import MentorDashboard from "./features/mentor/pages/Dashboard";



function App() {
  const { checkAuth, loading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="text-white bg-white dark:bg-neutral-900 min-h-screen">
      <Popup mode={ isAuthenticated ? "real":"demo"} />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <ScrollToTop/>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/course/:courseSlug" element={<CourseDetails />} />
            <Route path="/all-courses" element={<Courses/>} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/outsource" element={<OutSource />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />

            <Route  path="/course/:slug/demo" element={<DemoDashboardPage  />} />
            <Route path="/course/:slug/demo/quiz" element={<QuizList mode = "demo" />} />
            <Route path="/course/:slug/demo/quiz/:quizId" element={<Quiz mode="demo" />} />
           <Route path="/course/:slug/demo/play" element={<PlayGround mode="demo" />}/>
            <Route path="/course/:slug/demo/resume" element={<Resume mode="demo" />} />
            <Route path="/course/:slug/demo/projects" element={<Projects mode="demo" />} />
            <Route path="/course/:slug/demo/bounties" element={<Bounties mode="demo" />} />





            {/* <Route path="/course-dashboard/:courseId/projects" element={<ProjectList />} />
            <Route path="/course-dashboard/projects/:projectId" element={<Projects mode="demo"  />} /> */}

            <Route path="/course-dashboard/:slug/resume" element={<Resume mode="demo" />} />

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
              <Route
  path="/course-dashboard/:slug"
  element={
   
      <RealDashboardPage />
 
  }
/>

           <Route path="/course-dashboard/:slug/lessons" element={<PlayGround mode="real" />}/>

            <Route path="/learn-in-public" element={<LearnInPublicPage />} />
            <Route path="/course-dashboard/:slug/quiz" element={<QuizList mode = "real" />}/>
            <Route path="/course-dashboard/:slug/quiz/:quizId" element={<Quiz mode = "real" />}/>
            <Route path="/course-dashboard/:slug/projects" element={<Projects mode="real"  />} />
            <Route path="/course-dashboard/:slug/bounties" element={<Bounties mode="real" />} />
            <Route path="/course-dashboard/:slug/download-certificates" element={<Certificate  />} />
    
            



            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
