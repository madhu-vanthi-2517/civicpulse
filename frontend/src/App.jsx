import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './pages/authority/AdminDashboard';
import ComplaintForm from './pages/citizen/ComplaintForm';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
        
        {/* Temporary Sandbox Navigation Header (Optional - Can be removed later) */}
       

        {/* Central Component Routing Matrix */}
        <main>
          <Routes>
            {/* Base Route: Loads the Citizen Login / Registration Workspace */}
            <Route path="/" element={<ComplaintForm />} />

            {/* Admin Route: Loads the Secure Authority Overview Grid */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}