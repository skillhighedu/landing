import { Routes, Route } from "react-router-dom";
import { Suspense, lazy} from "react";
import Layout from "@/layouts/layout";
import "./App.css";
import "./index.css";
import Popup from "@/components/ui/Popup";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import PublicRoute from "@/routes/PublicRoute";
import OutSource from "./pages/OutSource";
import Spinner from "@/components/ui/Spinner";

// Lazy-loaded pages
const Home = lazy(() => import("@/pages/Home"));
const AllCourses = lazy(() => import("./components/AllCourses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const ContactUs = lazy(() => import("./components/Contact"));
const Profile = lazy(() => import("./components/Profile"));
const Signup = lazy(() => import("./pages/Signup"));
import GoogleCallback from "./pages/GoogleCallback";
import Blog from "./components/blogs/Blog";
import BlogDetail from "./components/blogs/BlogDetail";
// Optional: Create a minimal fallback
const Fallback = () => <Spinner/>

function App() {
  const { checkAuth, loading, isAuthenticated } = useAuthStore();

  
  useEffect(() => {
    checkAuth(); 
  }, [isAuthenticated]);

  return (
    <div className="text-white bg-neutral-900 min-h-screen">
      <Popup />
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<Layout />}>

            <Route path="/" element={<Home />} />
            <Route path="/course/:courseSlug" element={<CourseDetails />} />
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/outsource" element={<OutSource />} />
            <Route path="/blogs" element={<Blog />} />
             <Route path="/blogs/:slug" element={<BlogDetail />} />

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
      </Suspense>
    </div>
  );
}

export default App;
