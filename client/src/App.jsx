import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Nevbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Work from "./components/works/Works";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Project detail pages
import YoutubeProjects from "./components/works/YouTubeProjects";
import InstagramProjects from "./components/works/InstagramReels";
import BrandCommercials from "./components/works/BrandCommercials";
import MotionGraphics from "./components/works/MotionGraphics";

// Admin pages
import Admin from "./pages/Admin";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminSubscribers from "./pages/AdminSubscribers";
import AdminProjects from "./pages/AdminProjects";
import EditProject from "./pages/EditProject";
import AdminMessages from "./pages/AdminMessages";
import AdminLayout from "./components/AdminLayout";

function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Main sections — order: Home → Work → Services → Testimonials → About → Contact */}
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Project detail pages */}
          <Route path="/youtube-projects" element={<YoutubeProjects />} />
          <Route path="/instagram-projects" element={<InstagramProjects />} />
          <Route path="/brand-commercials" element={<BrandCommercials />} />
          <Route path="/motion-graphics" element={<MotionGraphics />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Admin />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
            <Route path="edit-project/:id" element={<EditProject />} />
          </Route>
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;