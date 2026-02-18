import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Compass, Settings, LogOut } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const InfluencerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/loginI");
        return;
      }
      setUser(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      navigate("/loginI");
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Influenso</h2>
          <p className="text-sm text-gray-500">Creator Dashboard</p>
        </div>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveNav("home")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === "home"
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home size={20} />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveNav("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === "profile"
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <User size={20} />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveNav("explore")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === "explore"
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Compass size={20} />
            <span>Explore</span>
          </button>

          <button
            onClick={() => setActiveNav("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === "settings"
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user?.email}!</h1>
            <p className="text-gray-600">Your creator dashboard</p>
          </div>

          {activeNav === "home" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Pending Opportunities</h3>
                <p className="text-3xl font-bold text-blue-600">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Active Campaigns</h3>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
                <p className="text-3xl font-bold text-purple-600">$0</p>
              </div>
            </div>
          )}

          {activeNav === "profile" && (
            <div className="bg-white p-8 rounded-lg shadow max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
              <p className="text-gray-600">Profile management coming soon...</p>
            </div>
          )}

          {activeNav === "explore" && (
            <div className="bg-white p-8 rounded-lg shadow max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Explore Opportunities</h2>
              <p className="text-gray-600">Brand opportunities coming soon...</p>
            </div>
          )}

          {activeNav === "settings" && (
            <div className="bg-white p-8 rounded-lg shadow max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <p className="text-gray-600">Account settings coming soon...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InfluencerDashboard;
