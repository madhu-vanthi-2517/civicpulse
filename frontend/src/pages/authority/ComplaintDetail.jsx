import { useState } from 'react';
import StatusBadge from '../../components/StatusBadge';
import UrgencyTag from '../../components/UrgencyTag';

const mockComplaint = {
  id: "CP-1024",
  title: "Main Street Pothole",
  description: "Large pothole on Main Street near the bus stop causing danger to two-wheelers. Present for over 2 weeks.",
  category: "Roads",
  urgency: "High",
  status: "Pending",
  date: "2026-06-12",
  district: "Puducherry",
  area: "Main Street",
  department: "Road Department",
  submittedBy: "citizen@test.com"
};

const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved"];

export default function ComplaintDetail() {
  const [complaint, setComplaint] = useState(mockComplaint);
  const [updated, setUpdated] = useState(false);

  const handleStatusChange = (newStatus) => {
    setComplaint({ ...complaint, status: newStatus });
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="text-sm text-indigo-600 hover:underline 
                     mb-6 flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 
                        shadow-xs p-6 mb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-mono text-indigo-500">
                {complaint.id}
              </span>
              <h1 className="text-xl font-bold text-gray-900 mt-1">
                {complaint.title}
              </h1>
            </div>
            <UrgencyTag urgency={complaint.urgency} />
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {complaint.description}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-400 block mb-1">
                Category
              </span>
              <span className="font-medium text-gray-700">
                {complaint.category}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-400 block mb-1">
                Department
              </span>
              <span className="font-medium text-gray-700">
                {complaint.department}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-400 block mb-1">
                District
              </span>
              <span className="font-medium text-gray-700">
                {complaint.district}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-400 block mb-1">
                Area
              </span>
              <span className="font-medium text-gray-700">
                {complaint.area}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-400 block mb-1">
                Submitted By
              </span>
              <span className="font-medium text-gray-700">
                {complaint.submittedBy}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-400 block mb-1">
                Date
              </span>
              <span className="font-medium text-gray-700">
                {complaint.date}
              </span>
            </div>
          </div>
        </div>

        {/* Status Update */}
        <div className="bg-white rounded-xl border border-gray-100 
                        shadow-xs p-6">
          <h2 className="text-sm font-semibold text-gray-700 
                         uppercase tracking-wider mb-4">
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
                className={`px-4 py-2 rounded-lg text-sm font-medium 
                  transition-colors ${
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