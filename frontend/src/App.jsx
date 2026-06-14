import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComplaintForm from './pages/citizen/ComplaintForm';
import Login from './pages/citizen/Login';
import Register from './pages/citizen/Register';


import AdminDashboard from './pages/authority/AdminDashboard'; 

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
        <main>
          <Routes>
            <Route path="/" element={<ComplaintForm />} />

            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
           
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}