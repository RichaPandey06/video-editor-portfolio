import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LayoutDashboard, FolderOpen, Mail, Users, LogOut, Menu, X } from "lucide-react";
import axios from "axios";
import API_URL from "../config/api";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const response = await axios.get(`${API_URL}/contact`, { headers });
        const count = response.data.filter((m) => !m.read).length;
        setUnreadCount(count);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(`${API_URL}/subscribers`, { headers });
        setSubscriberCount(response.data.length); // assuming API returns array of subscribers
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnread();
    fetchSubscribers();

    // refresh every 60 seconds
    const interval = setInterval(() => {
      fetchUnread();
      fetchSubscribers();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  const NAV_ITEMS = [
    { path: "/admin",             label: "Dashboard",   icon: LayoutDashboard },
    { path: "/admin/projects",    label: "Projects",    icon: FolderOpen },
    { path: "/admin/messages",    label: "Messages",    icon: Mail,  badge: unreadCount },
    { path: "/admin/subscribers", label: "Subscribers", icon: Users, badge: subscriberCount },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded" aria-label="Toggle menu">
              {sidebarOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
            <span className="text-lg font-black tracking-tight">
              RICHA<span className="text-zinc-500">.ADMIN</span>
            </span>
          </div>
          <button onClick={handleLogout} className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/60 border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white text-sm font-medium transition-all duration-200">
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      <div className="relative flex flex-1">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)] w-60 bg-zinc-950/95 md:bg-transparent border-r border-white/[0.08] flex flex-col pt-16 md:pt-0 z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <div className="flex flex-col flex-1 px-3 py-6 gap-1">
            {NAV_ITEMS.map(({ path, label, icon: Icon, badge }) => (
              <Link key={path} to={path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(path)
                    ? "bg-white/[0.08] text-white border border-white/[0.1]"
                    : "text-zinc-500 hover:text-white hover:bg-white/[0.04]"
                }`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {badge > 0 && (
                  <span className="ml-auto min-w-[18px] h-[18px] px-1 rounded-full bg-violet-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
                {isActive(path) && !badge && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
