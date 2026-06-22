import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";

const PUDUCHERRY_DISTRICTS = [
  "Puducherry",
  "Karaikal",
  "Mahe",
  "Yanam"
];

export default function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const { token, user } = useAuth();

  const handleSubmit = async () => {
    if (!title || !description || !district) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await api.submitComplaint(
        { title, description, district, area, user_id: user?.id  },
        token
      );
      if (data.id) {
        setResult(data);
        setTitle("");
        setDescription("");
        setDistrict("");
        setArea("");
      } else {
        setError("Submission failed. Try again.");
      }
    } catch (err) {
      setError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white
                      rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Submit a Complaint
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Puducherry Region — AI will auto-categorize
          your complaint
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium
                               text-gray-700 block mb-1">
              Complaint Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Pothole on main road"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300
                         rounded-lg px-4 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium
                               text-gray-700 block mb-1">
              Description *
            </label>
            <textarea
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-gray-300
                         rounded-lg px-4 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium
                               text-gray-700 block mb-1">
              District *
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full border border-gray-300
                         rounded-lg px-4 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select District</option>
              {PUDUCHERRY_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium
                               text-gray-700 block mb-1">
              Area / Locality
            </label>
            <input
              type="text"
              placeholder="e.g. Anna Nagar, Lawspet"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full border border-gray-300
                         rounded-lg px-4 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>

         {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">{error}</p>
            <p className="text-xs text-red-400 mt-1">
              Make sure the backend server is running, or try again
              in a moment.
            </p>
          </div>
        )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white py-3
                       rounded-lg hover:bg-blue-700
                       font-semibold disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>

          {/* AI Result shown after submission */}
          {result && (
            <div className="mt-2 p-4 bg-emerald-50
                            border border-emerald-200
                            rounded-lg">
              <p className="text-sm font-semibold
                            text-emerald-700 mb-2">
                ✓ Complaint submitted! AI has categorized it:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-lg p-2
                                text-center border
                                border-emerald-100">
                  <p className="text-xs text-gray-400">
                    Category
                  </p>
                  <p className="text-sm font-semibold
                                text-gray-700">
                    {result.category}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-2
                                text-center border
                                border-emerald-100">
                  <p className="text-xs text-gray-400">
                    Urgency
                  </p>
                  <p className="text-sm font-semibold
                                text-gray-700">
                    {result.urgency}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-2
                                text-center border
                                border-emerald-100">
                  <p className="text-xs text-gray-400">
                    Department
                  </p>
                  <p className="text-sm font-semibold
                                text-gray-700">
                    {result.department}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Complaint ID: #{result.id}
              </p>
            </div>
          )}

          {/* Duplicate warning — NEW for Day 7 */}
          {result?.duplicate_warning && (
            <div className="mt-2 p-4 bg-amber-50 border
                            border-amber-200 rounded-lg">
              <p className="text-sm font-semibold text-amber-700">
                ⚠ This looks similar to complaint #{result.similar_to_id}
              </p>
              <p className="text-xs text-amber-600 mt-1">
                It may already be reported. Your complaint was
                still submitted and will be reviewed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}