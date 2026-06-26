import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";
import ComplaintCard from "../../components/ComplaintCard";
// 🌟 Added icons for dashboard banner
import { FileBarChart2, Loader, CheckCircle, ArrowRight } from "lucide-react"; 

export default function ComplaintTracker() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await api.getMyComplaints(user?.id);
        if (Array.isArray(data)) {
          setComplaints(data);
        } else {
          setError("Failed to load complaints");
        }
      } catch (err) {
        setError("Cannot connect to server.");
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchComplaints();
  }, [user]);

  // 🌟 Day 7 Analytics Aggregations (Resolves Point 7 for Hackathon Panels)
  const totalCount = complaints.length;
  const pendingCount = complaints.filter(c => c.status?.toLowerCase() !== 'resolved').length;
  const resolvedCount = complaints.filter(c => c.status?.toLowerCase() === 'resolved').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Title Block Header */}
        <div className="mb-6 text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            My Complaints
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            All complaints you've reported, including ones merged with similar reports
          </p>
        </div>

        {/* 🌟 Rapid Stat Metric Cards Grid Layer */}
        {!loading && !error && complaints.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6 text-left">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><FileBarChart2 size={20} /></div>
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Total Filed</p>
                <p className="text-xl font-bold text-gray-800">{totalCount}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="bg-amber-50 p-2 rounded-lg text-amber-600"><Loader size={20} className="animate-spin" /></div>
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">In Progress</p>
                <p className="text-xl font-bold text-gray-800">{pendingCount}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><CheckCircle size={20} /></div>
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Resolved</p>
                <p className="text-xl font-bold text-gray-800">{resolvedCount}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 py-8 font-medium">
            {error}
          </p>
        )}

        {/* Empty State View Wrapper */}
        {!loading && !error && complaints.length === 0 && (
          <div className="text-center bg-white border border-gray-100 rounded-2xl py-16 px-4 shadow-sm">
            <p className="text-lg font-medium text-gray-400">
              No complaints submitted yet.
            </p>
            <Link to="/submit" className="text-blue-600 text-sm mt-3 font-semibold hover:underline inline-flex items-center gap-1 justify-center">
              <span>Submit your first complaint</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Main Feed Container List */}
        {!loading && !error && complaints.length > 0 && (
          <div className="flex flex-col gap-4">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="group">
                <ComplaintCard
                  complaint={{
                    ...complaint,
                    location: `${complaint.district} — ${complaint.area}`
                  }}
                />
                {complaint.report_count > 1 && (
                  <p className="text-[11px] text-indigo-500 font-semibold mt-1.5 ml-2 text-left bg-indigo-50/50 w-fit px-2 py-0.5 rounded border border-indigo-100/30">
                    ⚠ Upvoted/reported by {complaint.report_count} nearby residents.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}