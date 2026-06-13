import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/authority/AdminDashboard';

// Placeholder for Mathi's Citizen view until she pushes her file named 'ComplaintForm'
const CitizenPlaceholder = () => (
  <div className="p-8 text-center bg-gray-50 min-h-screen flex flex-col items-center justify-center text-left">
    <div className="max-w-md bg-white p-6 rounded-xl shadow-xs border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">CivicPulse · Citizen Portal</h2>
      <p className="text-gray-500 mt-2 text-sm">
        Mathi's interactive complaint submission form sits here on the main landing page timeline.
      </p>
      <div className="mt-5 border-t border-gray-100 pt-4">
        <a href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
          Switch to Authority Panel View ➔
        </a>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Base URL path loads the Citizen timeline/form view */}
        <Route path="/" element={<CitizenPlaceholder />} />
        
        {/* 2. Admin URL path loads your Official dashboard summary console */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}