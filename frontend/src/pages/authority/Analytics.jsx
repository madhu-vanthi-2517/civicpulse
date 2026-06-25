import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie,
  Cell, Legend
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api';

const STATUS_COLORS = {
  Pending: "#F59E0B",
  "In Progress": "#3B82F6",
  Resolved: "#10B981"
};

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await api.getAnalytics(token);
        setData(result);
      } catch (err) {
        console.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [token]);

  const renderCustomPieLabel = ({ name, value }) => {
    if (value === 0) return '';
    return `${name}: ${value}`;
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col gap-4 w-full max-w-5xl">
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load analytics.</p>
      </div>
    );
  }

  const pendingCount = data.by_status.find(s => s.name === "Pending")?.value || 0;
  const resolvedCount = data.by_status.find(s => s.name === "Resolved")?.value || 0;
  const resolutionRate = data.total > 0 ? Math.round((resolvedCount / data.total) * 100) : 0;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Header Row featuring Branding Element */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <div className="text-left">
            <button
              onClick={() => navigate('/admin')}
              className="text-xs font-semibold text-indigo-600 hover:underline mb-2 block"
            >
              ← Back to Command Panel
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Puducherry Region — Complaint Intelligence Overview
            </p>
          </div>
          <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-xs flex items-center justify-center">
            <img 
              src="/logo_civicpulse.jpeg" 
              alt="CivicPulse Custom Brand Logo" 
              className="h-[90px] w-auto max-w-[200px] object-contain"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8 text-left">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Complaints
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {data.total}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
            <h3 className="text-xs font-medium text-amber-600 uppercase tracking-wider">
              Pending
            </h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">
              {pendingCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
            <h3 className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
              Resolved
            </h3>
            <p className="text-3xl font-bold text-emerald-700 mt-2">
              {resolvedCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
            <h3 className="text-xs font-medium text-blue-600 uppercase tracking-wider">
              Resolution Rate
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {resolutionRate}%
            </p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-6 text-left">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">
              By Category
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.by_category}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">
              By District
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.by_district}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="district" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs text-left">
          <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">
            Status Distribution
          </h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data.by_status}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={renderCustomPieLabel}
                >
                  {data.by_status.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}