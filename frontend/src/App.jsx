import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComplaintForm from './pages/citizen/ComplaintForm';

// Self-contained placeholder so the compiler never breaks on this branch
function AdminPlaceholder() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen text-left font-sans">
      <h1 className="text-2xl font-bold text-slate-950 mb-2">Authority Panel</h1>
      <p className="text-gray-500 text-sm">
        Secured administrative environment module active. (Files residing on authority branch).
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
        <main>
          <Routes>
            {/* Base Home Route: Mathi's Citizen Portal Card Layout */}
            <Route path="/" element={<ComplaintForm />} />

            <Route path="/admin" element={<AdminPlaceholder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}