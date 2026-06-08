import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { FiGrid, FiFolder, FiMail, FiUsers, FiLogOut, FiMenu, FiX, FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import API_URL from "../config/api";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { navigate("/admin/login"); return; }

      const headers = { Authorization: `Bearer ${token}` };
      setIsLoading(true);
      setError(null);

      const [contactRes, subscribersRes, projectsRes] = await Promise.all([
        axios.get(`${API_URL}/contact`, { headers }),
        axios.get(`${API_URL}/subscribers`, { headers }),
        axios.get(`${API_URL}/project`, { headers }),
      ]);

      setUnreadCount(Array.isArray(contactRes.data) ? contactRes.data.filter((m) => !m.read).length : 0);
      setSubscriberCount(Array.isArray(subscribersRes.data) ? subscribersRes.data.length : 0);
      setProjectCount(Array.isArray(projectsRes.data) ? projectsRes.data.length : 0);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      if (err.response?.status === 401) { localStorage.removeItem("token"); navigate("/admin/login"); return; }
      if (err.response?.status === 429) { console.warn("Rate limited — skipping this poll cycle."); return; }
      setError(err.response?.data?.message || err.message || "Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboardData();

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") fetchDashboardData();
    }, 5 * 60 * 1000);

    let hiddenAt = null;
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        hiddenAt = Date.now();
      } else if (document.visibilityState === "visible") {
        const awayMs = Date.now() - (hiddenAt || 0);
        if (awayMs > 2 * 60 * 1000) fetchDashboardData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchDashboardData]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const NAV_ITEMS = [
    { path: "/admin",             label: "Dashboard",   icon: FiGrid },
    { path: "/admin/projects",    label: "Projects",    icon: FiFolder,  badge: projectCount },
    { path: "/admin/messages",    label: "Messages",    icon: FiMail,    badge: unreadCount },
    { path: "/admin/subscribers", label: "Subscribers", icon: FiUsers,   badge: subscriberCount },
  ];

  const handleLogout = () => { localStorage.removeItem("token"); navigate("/admin/login"); };
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded hover:bg-white/[0.05]"
              aria-label="Toggle sidebar menu">
              {sidebarOpen ? <FiX size={20} strokeWidth={1.75} /> : <FiMenu size={20} strokeWidth={1.75} />}
            </button>
            <span className="text-lg font-black tracking-tight">
              RICHA<span className="text-zinc-500">.ADMIN</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {isLoading && (
              <div className="hidden md:flex items-center gap-2 text-xs text-zinc-400">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Syncing...
              </div>
            )}
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/60 border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white text-sm font-medium transition-all duration-200 hover:bg-zinc-900"
              title="Logout from admin">
              <FiLogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
        {error && (
          <div className="px-4 sm:px-6 lg:px-10 py-2 bg-red-500/10 border-t border-red-500/20 flex items-center gap-2 text-red-400 text-sm">
            <FiAlertCircle size={16} className="flex-shrink-0" />
            {error}
            <button onClick={() => fetchDashboardData()} className="ml-auto text-xs underline hover:no-underline">Retry</button>
          </div>
        )}
      </header>

      <div className="relative flex flex-1">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 md:hidden z-20" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
        )}

        <aside className={`fixed inset-y-0 left-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)] w-60 bg-zinc-950/95 md:bg-transparent border-r border-white/[0.08] flex flex-col pt-16 md:pt-0 z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <nav className="flex flex-col flex-1 px-3 py-6 gap-1">
            {NAV_ITEMS.map(({ path, label, icon: Icon, badge }) => (
              <Link key={path} to={path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(path)
                    ? "bg-white/[0.08] text-white border border-white/[0.1]"
                    : "text-zinc-500 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`} title={label}>
                <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
                <span className="flex-1">{label}</span>
                {badge > 0 && (
                  <span className="min-w-[24px] h-[24px] px-1.5 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
                {isActive(path) && !badge && <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />}
              </Link>
            ))}
          </nav>
          <div className="px-3 py-4 border-t border-white/[0.08] md:hidden">
            <button onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 text-sm font-medium transition-all duration-200">
              <FiLogOut className="w-4 h-4" strokeWidth={1.75} />
              Logout
            </button>
          </div>
        </aside>

        <main className="relative flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-10">
          <div className="max-w-7xl mx-auto">
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
                  <p className="text-zinc-400 text-sm">Loading dashboard...</p>
                </div>
              </div>
            )}
            {!isLoading && <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;