import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import UrgencyTag from '../../components/UrgencyTag';

const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved"];

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const cleanId = id.replace('#', '').trim();
        const data = await fetch(`http://127.0.0.1:8000/api/complaint/${cleanId}`);
        const json = await data.json();
        setComplaint(json);
      } catch (err) {
        console.error("Failed to load complaint");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      const cleanId = id.replace('#', '').trim();
      await api.updateStatus(cleanId, newStatus, token);
      setComplaint({ ...complaint, status: newStatus });
      setUpdated(true);
      setTimeout(() => setUpdated(false), 3000);
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400">Loading complaint...</p>
    </div>
  );

  if (!complaint) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500">Complaint not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/admin')}
          className="text-sm text-indigo-600 hover:underline mb-6 flex items-center gap-1"
        >
          {"← Back to Dashboard"}
        </button>

        <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-6 mb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-mono text-indigo-500">
                #{complaint.id}
              </span>
              <h1 className="text-xl font-bold text-gray-900 mt-1">
                {complaint.title}
              </h1>
            </div>
            <UrgencyTag urgency={complaint.urgency} />
          </div>

          <p className="text-sm text-gray-600 mb-4 text-left">
            {complaint.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-sm mb-6">
            {[
              ["Category", complaint.category],
              ["Department", complaint.department_name],
              ["District", complaint.district],
              ["Area", complaint.area],
            ].map(([label, value]) => (
              <div key={label} className="bg-gray-50 rounded-lg p-3 text-left">
                <span className="text-xs text-gray-400 block mb-1">
                  {label}
                </span>
                <span className="font-medium text-gray-700">
                  {value || "N/A"}
                </span>
              </div>
            ))}
          </div>

          {/* 📸 Mock Evidence Image Showcase Panel */}
          <div className="mt-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50 text-left">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
              Attached Citizen Evidence
            </span>
            {complaint.image_url ? (
              <img 
                src={complaint.image_url} 
                alt="Evidence Upload" 
                className="max-w-xs h-auto rounded-lg border border-gray-200 shadow-xs"
              />
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-400 py-1 font-sans">
                <span>📷 Placeholder View: Using default workspace logo context</span>
                <img src="/logo_civicpulse.jpeg" className="w-12 h-12 object-contain ml-auto opacity-40" alt="mock" />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-6 text-left">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
            Update Status
          </h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-500">
              Current:
            </span>
            <StatusBadge status={complaint.status} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  complaint.status === s 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {updated && (
            <p className="mt-3 text-sm text-emerald-600 font-medium">
              ✓ Status updated successfully
            </p>
          )}
        </div>
      </div>
    </div>
  );
}