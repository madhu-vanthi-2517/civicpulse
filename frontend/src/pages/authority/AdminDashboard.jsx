import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import UrgencyTag from '../../components/UrgencyTag';
import { LogOut, ClipboardList, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sortByReports, setSortByReports] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await api.getComplaints(token);
        if (Array.isArray(data)) setComplaints(data);
      } catch (err) {
        console.error("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [token]);

  const handleLogoutClick = () => {
    if (logout) logout();
    navigate('/login');
  };

  const pendingCount = complaints.filter(
    c => c.status === "Pending"
  ).length;

  const displayedComplaints = sortByReports
    ? [...complaints].sort((a, b) => b.report_count - a.report_count)
    : complaints;

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-slate-900 font-sans antialiased overflow-x-hidden">

      {/* Sidebar */}
      <aside className={`flex-shrink-0 bg-white border-r border-gray-200 p-4 flex flex-col justify-between text-left transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Top Navigation & Logo Branding */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 min-h-[85px]">
            {!isCollapsed ? (
              <img 
                src="/logo_civicpulse.jpeg" 
                alt="CivicPulse Logo" 
                className="h-[75px] w-auto max-w-[180px] object-contain"
              />
            ) : (
              <span className="text-xl font-bold text-gray-900 mx-auto">CP</span>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 font-mono text-sm border border-gray-200 cursor-pointer shadow-xs ml-2"
            >
              {isCollapsed ? "▶" : "◀"}
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            <button
              onClick={() => navigate('/admin')}
              className={`w-full flex items-center gap-3 font-medium text-sm px-3 py-2.5 bg-indigo-50 text-indigo-700 rounded-lg cursor-pointer ${
                isCollapsed ? 'justify-center' : 'text-left'
              }`}>
              <ClipboardList size={18} />
              {!isCollapsed && <span>Complaints</span>}
            </button>
            <button
              onClick={() => navigate('/analytics')}
              className={`w-full flex items-center gap-3 font-medium text-sm px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer ${
                isCollapsed ? 'justify-center' : 'text-left'
              }`}>
              <BarChart3 size={18} />
              {!isCollapsed && <span>Analytics</span>}
            </button>
          </nav>
        </div>

        {/* Bottom Panel Actions: Node Security + Logout Trigger */}
        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
          <button
            onClick={handleLogoutClick}
            className={`w-full flex items-center gap-3 font-medium text-sm px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer ${
              isCollapsed ? 'justify-center' : 'text-left'
            }`}
          >
            <LogOut size={18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
          
          <div className={`text-[10px] text-gray-400 ${
            isCollapsed ? 'text-center' : 'text-left'
          }`}>
            {isCollapsed ? "🔒" : "Secured Authority Node"}
          </div>
        </div>
      </aside>

      {/* Main content body canvas */}
      <main className="flex-1 w-full p-8 overflow-y-auto bg-gray-50">
        <header className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Authority Command Panel
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Puducherry Region Prototype Dashboard
          </p>
        </header>

        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs text-left">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Total</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {complaints.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs text-left">
            <h3 className="text-sm font-medium text-amber-600 uppercase">Pending</h3>
            <p className="text-2xl font-bold text-amber-700 mt-2">
              {pendingCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs text-left">
            <h3 className="text-sm font-medium text-emerald-600 uppercase">Resolved</h3>
            <p className="text-2xl font-bold text-emerald-700 mt-2">
              {complaints.filter(c => c.status === "Resolved").length}
            </p>
          </div>
        </div>

        {/* Filtering Controllers */}
        <div className="text-left">
          <button
            onClick={() => setSortByReports(!sortByReports)}
            className="mb-4 text-sm text-indigo-600 hover:underline cursor-pointer"
          >
            {sortByReports ? "✓ Sorted by most reported" : "Sort by most reported"}
          </button>
        </div>

        {/* Core Tickets Grid View */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-xs p-4 animate-pulse h-12" />
            ))}
          </div>
        ) : (
          <div className="w-full bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-xs">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  {["ID","Complaint","Category","Department","Urgency","Status","Action"].map(h => (
                    <th key={h} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedComplaints.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-sm font-mono text-indigo-600 text-left">
                      #{item.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-left">
                      <div className="flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.report_count > 1 && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                            Reported {item.report_count}×
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-gray-500 text-left">
                      <span className="bg-gray-100 rounded-md px-2 py-1">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-left">
                      {item.department_name}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <UrgencyTag urgency={item.urgency} />
                    </td>
                    <td className="px-6 py-4 text-left">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 text-left">
                      <Link 
                        to={`/complaint/${item.id.toString().replace('#', '').trim()}`}
                        className="text-xs text-indigo-600 hover:underline font-medium"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}