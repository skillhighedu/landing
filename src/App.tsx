import { Routes, Route } from "react-router-dom";
import { lazy} from "react";
import Layout from "@/layouts/layout";
import "./App.css";
import "./index.css";
import Popup from "@/components/ui/Popup";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import PublicRoute from "@/routes/PublicRoute";
import OutSource from "@/pages/landing/OutSource";
// import Spinner from "@/components/ui/Spinner";

// Lazy-loaded pages
const Home = lazy(() => import("@/pages/landing/Home"));
const AllCourses = lazy(() => import("@/pages/courses/AllCourses"));
const CourseDetails = lazy(() => import("@/components/course-dashboard/CourseDetails"));
const ContactUs = lazy(() => import("@/features/landing/components/Contact"));
const Profile = lazy(() => import("@/pages/profile/Profile"));
const Signup = lazy(() => import("@/pages/landing/Signup"));
// const CourseDashboard = lazy(() => import("@/pages/dashboard/CourseDashboard"));
// const QuizList = lazy(() => import("@/components/course-dashboard/course-essentials/QuizList"));

// const Projects = lazy(() => import("@/components/course-dashboard/course-essentials/Projects"));
// const Resume = lazy(() => import("@/features/resume/Resume"));
// const BountiesList = lazy(() => import("@/components/course-dashboard/course-essentials/BountiesList"));
const LearnInPublicPage = lazy(() => import("@/pages/dashboard/LearnInPublicPage"));
import GoogleCallback from "@/pages/landing/GoogleCallback";
import Blog from "@/pages/blogs/Blog";
import BlogDetail from "@/pages/blogs/BlogDetail";

// import PlayGround from "./pages/dashboard/PlayGround";
// import Quiz from "./features/quiz/components/Quiz";
// import ProjectList from "./features/projects/components/ProjectList";
// import BountyList from "./features/bounties/components/BountyList";

// Optional: Create a minimal fallback



// const Fallback = () => <Spinner/>

function App() {
  const { checkAuth, loading, isAuthenticated } = useAuthStore();

  
  useEffect(() => {
    checkAuth(); 
  }, [isAuthenticated]);

  return (

<div className="text-white bg-neutral-900 min-h-screen">
      <Popup />

        <Routes>
          <Route element={<Layout />}>

            <Route path="/" element={<Home />} />
            <Route path="/course/:courseSlug" element={<CourseDetails />} />
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/outsource" element={<OutSource />} />
            <Route path="/blogs" element={<Blog />} />
             <Route path="/blogs/:slug" element={<BlogDetail />} />
           
             {/* <Route path="/course-dashboard/:slug" element={<CourseDashboard />} /> */}
             {/* <Route path="/course-dashboard/:courseId/quiz" element={<QuizList />} />
             <Route path="/course-dashboard/:slug/quiz/:quizId" element={<Quiz />} />

             <Route path="/course-dashboard/:slug/lessons" element={<PlayGround />} />
             <Route path="/course-dashboard/:courseId/projects" element={<ProjectList />} />
             <Route path="/course-dashboard/projects/:projectId" element={<Projects />} /> */}

             {/* <Route path="/course-dashboard/:courseId/bounties" element={<BountyList />} /> */}
             <Route path="/learn-in-public" element={<LearnInPublicPage />} />
             {/* <Route path="/course-dashboard/resume" element={<Resume />} /> */}

            <Route path="/api/v2/auth/google/callback" element={<GoogleCallback />} />
              
            
            <Route
              path="/signup"
              element={
                <PublicRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Signup />
                </PublicRoute>
              }
            />
            



            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />

            </Route>
          </Route>
        </Routes>

    </div>

    
  );
}

export default App;
