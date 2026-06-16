import { BrowserRouter as Router, Routes, Route, 
         Link, useLocation } from 'react-router-dom';
import ComplaintForm from './pages/citizen/ComplaintForm';
import Login from './pages/citizen/Login';
import Register from './pages/citizen/Register';
import ComplaintTracker from './pages/citizen/ComplaintTracker';
import PublicTracker from './pages/citizen/PublicTracker';
import AdminDashboard from './pages/authority/AdminDashboard';
import Analytics from './pages/authority/Analytics';
import ComplaintDetail from './pages/authority/ComplaintDetail';

function Navbar() {
  const location = useLocation();

  const isAdminPage = 
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/analytics') ||
    location.pathname.startsWith('/complaint/');

  const isAuthPage = 
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/';

  if (isAdminPage || isAuthPage) return null;

  return (
    <nav className="bg-white border-b border-gray-200
                    px-6 py-3 flex items-center
                    justify-between sticky top-0 z-10">
      <Link to="/"
            className="font-bold text-indigo-600 text-lg">
        CivicPulse
      </Link>
      <div className="flex gap-4 text-sm items-center">
        <Link to="/track"
              className="text-gray-600 hover:text-indigo-600">
          Track Complaints
        </Link>
        <Link to="/submit"
              className="text-gray-600 hover:text-indigo-600">
          Submit
        </Link>
        <Link to="/my-complaints"
              className="text-gray-600 hover:text-indigo-600">
          My Complaints
        </Link>
        <Link to="/login"
              className="bg-indigo-600 text-white px-4
                         py-1.5 rounded-lg
                         hover:bg-indigo-700 font-medium">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50
                      text-slate-900 font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/submit" element={<ComplaintForm />} />
            <Route path="/my-complaints"
                   element={<ComplaintTracker />} />
            <Route path="/track" element={<PublicTracker />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/complaint/:id"
                   element={<ComplaintDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}