import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComplaintForm from './pages/citizen/ComplaintForm';
import AdminDashboard from './pages/authority/AdminDashboard'; // 1. Real component imported cleanly

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
        <main>
          <Routes>
            <Route path="/" element={<ComplaintForm />} />

           
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}