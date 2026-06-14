import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComplaintForm from './pages/citizen/ComplaintForm';
import Login from './pages/citizen/Login';
import Register from './pages/citizen/Register';
import ComplaintTracker from './pages/citizen/ComplaintTracker';
import PublicTracker from './pages/citizen/PublicTracker';
import AdminDashboard from './pages/authority/AdminDashboard'; 
import Analytics from './pages/authority/Analytics';
import ComplaintDetail from './pages/authority/ComplaintDetail';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
        <main>
          <Routes>
            <Route path="/" element={<ComplaintForm />} />

            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-complaints" element={<ComplaintTracker />} />
            <Route path="/track" element={<PublicTracker />} />
           
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/complaint/:id" element={<ComplaintDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}