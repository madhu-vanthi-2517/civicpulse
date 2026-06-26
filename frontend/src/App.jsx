import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import ComplaintForm from "./pages/citizen/ComplaintForm";
import Login from "./pages/citizen/Login";
import Register from "./pages/citizen/Register";
import ComplaintTracker from "./pages/citizen/ComplaintTracker";
import PublicTracker from "./pages/citizen/PublicTracker";
import AdminDashboard from "./pages/authority/AdminDashboard";
import Analytics from "./pages/authority/Analytics";
import ComplaintDetail from "./pages/authority/ComplaintDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // 🌟 Authority routes check (Sidebar handled internally)
  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/analytics") ||
    location.pathname.startsWith("/complaint/");

  // 🌟 Public unauthenticated pages check (Hides general navbar)
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/public-tracker"; // Safe fallback match

  if (isAdminPage || isAuthPage) return null;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between w-full mx-auto">
        <Link
          to="/track"
          className="flex items-center gap-3 font-bold text-indigo-600 text-xl tracking-tight"
        >
          <img
            src="/logo_civicpulse.jpeg"
            alt="CivicPulse Logo"
            className="h-14 w-auto object-contain"
          />
          <div className="flex flex-col justify-center">
            <span className="text-xl font-bold text-gray-900 leading-none">CivicPulse</span>
            <span className="text-[10px] text-indigo-600 font-semibold tracking-wider mt-0.5 leading-none">
              Smart. Simple. Transparent.
            </span>
          </div>
        </Link>

        <div className="hidden md:flex gap-6 text-sm items-center font-medium">
          <Link
            to="/track"
            className={`transition-all duration-200 pb-1 ${
              isActive("/track")
                ? "text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            Track Complaints
          </Link>

          <Link
            to="/submit"
            className={`transition-all duration-200 pb-1 ${
              isActive("/submit")
                ? "text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            Submit
          </Link>

          <Link
            to="/my-complaints"
            className={`transition-all duration-200 pb-1 ${
              isActive("/my-complaints")
                ? "text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            My Complaints
          </Link>

          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <span className="text-xs text-gray-400">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-200 font-medium text-sm transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 font-semibold text-sm transition shadow-xs"
            >
              Login
            </Link>
          )}
        </div>

        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-indigo-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drop layout */}
      {isOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col gap-3 pb-2 text-sm font-medium">
          <Link
            to="/track"
            onClick={() => setIsOpen(false)}
            className={`py-1 ${isActive("/track") ? "text-indigo-600 font-semibold" : "text-gray-600"}`}
          >
            Track Complaints
          </Link>

          <Link
            to="/submit"
            onClick={() => setIsOpen(false)}
            className={`py-1 ${isActive("/submit") ? "text-indigo-600 font-semibold" : "text-gray-600"}`}
          >
            Submit
          </Link>

          <Link
            to="/my-complaints"
            onClick={() => setIsOpen(false)}
            className={`py-1 ${isActive("/my-complaints") ? "text-indigo-600 font-semibold" : "text-gray-600"}`}
          >
            My Complaints
          </Link>

          {user ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-400 truncate">{user.email}</span>
              <button
                onClick={handleLogout}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-center font-semibold text-xs"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg text-center font-semibold text-xs block mt-1"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      {/* 🌟 FIXED: Dropped all screen boxing limits to force true edge-to-edge width layout */}
      <div className="min-h-screen w-full m-0 p-0 bg-gray-50 text-slate-900 font-sans overflow-x-hidden">
        <Navbar />
        <main className="w-full m-0 p-0">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/submit"
              element={
                <ProtectedRoute requiredRole="citizen">
                  <ComplaintForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-complaints"
              element={
                <ProtectedRoute requiredRole="citizen">
                  <ComplaintTracker />
                </ProtectedRoute>
              }
            />

            {/* 🌟 SYNCED PATHNAME: Maps public analytics grid right to /track */}
            <Route path="/track" element={<PublicTracker />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="authority">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute requiredRole="authority">
                  <Analytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/complaint/:id"
              element={
                <ProtectedRoute requiredRole="authority">
                  <ComplaintDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}