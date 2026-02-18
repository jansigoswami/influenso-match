import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Users, Briefcase, Settings, LogOut } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const BrandDashboard: React.FC = () => {
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
        navigate("/loginB");
        return;
      }
      setUser(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      navigate("/loginB");
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
          <p className="text-sm text-gray-500">Brand Dashboard</p>
        </div>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveNav("home")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === "home"
                ? "bg-purple-50 text-purple-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home size={20} />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveNav("creators")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === "creators"
                ? "bg-purple-50 text-purple-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users size={20} />
            <span>Find Creators</span>
          </button>

          <button
            onClick={() => setActiveNav("campaigns")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === "campaigns"
                ? "bg-purple-50 text-purple-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Briefcase size={20} />
            <span>Campaigns</span>
          </button>

          <button
            onClick={() => setActiveNav("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === "settings"
                ? "bg-purple-50 text-purple-600 font-semibold"
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
            <p className="text-gray-600">Your brand dashboard</p>
          </div>

          {activeNav === "home" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Active Campaigns</h3>
                <p className="text-3xl font-bold text-purple-600">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Connected Creators</h3>
                <p className="text-3xl font-bold text-pink-600">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Budget Spent</h3>
                <p className="text-3xl font-bold text-indigo-600">$0</p>
              </div>
            </div>
          )}

          {activeNav === "creators" && (
            <div className="bg-white p-8 rounded-lg shadow max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Find Creators</h2>
              <p className="text-gray-600">Browse and connect with creators...</p>
            </div>
          )}

          {activeNav === "campaigns" && (
            <div className="bg-white p-8 rounded-lg shadow max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Your Campaigns</h2>
              <p className="text-gray-600">Manage your brand campaigns...</p>
            </div>
          )}

          {activeNav === "settings" && (
            <div className="bg-white p-8 rounded-lg shadow max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <p className="text-gray-600">Account and brand settings...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BrandDashboard;
