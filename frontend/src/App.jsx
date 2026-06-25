import { BrowserRouter as Router, Routes, Route,
         Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';  
import { useAuth } from './context/AuthContext';
import ComplaintForm from './pages/citizen/ComplaintForm';
import Login from './pages/citizen/Login';
import Register from './pages/citizen/Register';
import ComplaintTracker from './pages/citizen/ComplaintTracker';
import PublicTracker from './pages/citizen/PublicTracker';
import AdminDashboard from './pages/authority/AdminDashboard';
import Analytics from './pages/authority/Analytics';
import ComplaintDetail from './pages/authority/ComplaintDetail';
import ProtectedRoute from './components/ProtectedRoute';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); 

  const isAdminPage =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/analytics') ||
    location.pathname.startsWith('/complaint/');

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/';

  if (isAdminPage || isAuthPage) return null;

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close mobile menu if logging out from it
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* 🌟 Brand Header Link - Optimized to scale the rectangular image asset fluidly */}
        <Link to="/" className="flex items-center gap-1 font-bold text-indigo-600 text-xl tracking-tight">
          <img 
            src="/logo_civicpulse.jpeg" 
            alt="CivicPulse Logo" 
            className="h-[95px] w-auto object-contain max-w-[160px]" 
          />
          <span>CivicPulse</span>
        </Link>

        {/* 💻 Desktop Links View (hidden on mobile screens) */}
        <div className="hidden md:flex gap-6 text-sm items-center font-medium">
          <Link to="/track" className="text-gray-600 hover:text-indigo-600 transition">
            Track Complaints
          </Link>
          <Link to="/submit" className="text-gray-600 hover:text-indigo-600 transition">
            Submit
          </Link>
          <Link to="/my-complaints" className="text-gray-600 hover:text-indigo-600 transition">
            My Complaints
          </Link>

          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <span className="text-xs text-gray-400">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-200 font-medium text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 font-medium transition">
              Login
            </Link>
          )}
        </div>

        {/* 📱 Mobile Toggle Trigger (hidden on desktops) */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-indigo-600 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu Slider Block */}
      {isOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col gap-3 pb-2 text-sm font-medium">
          <Link 
            to="/track" 
            onClick={() => setIsOpen(false)} 
            className="text-gray-600 hover:text-indigo-600 py-1 transition"
          >
            Track Complaints
          </Link>
          <Link 
            to="/submit" 
            onClick={() => setIsOpen(false)} 
            className="text-gray-600 hover:text-indigo-600 py-1 transition"
          >
            Submit
          </Link>
          <Link 
            to="/my-complaints" 
            onClick={() => setIsOpen(false)} 
            className="text-gray-600 hover:text-indigo-600 py-1 transition"
          >
            My Complaints
          </Link>

          {user ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-400 truncate">
                {user.email}
              </span>
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
      <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/submit" element={<ProtectedRoute requiredRole="citizen"><ComplaintForm /></ProtectedRoute>} />
            <Route path="/my-complaints" element={<ProtectedRoute requiredRole="citizen"><ComplaintTracker /></ProtectedRoute>} />
            <Route path="/track" element={<PublicTracker />} />
            <Route path="/admin" element={<ProtectedRoute requiredRole="authority"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute requiredRole="authority"><Analytics /></ProtectedRoute>} />
            <Route path="/complaint/:id" element={<ProtectedRoute requiredRole="authority"><ComplaintDetail /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}