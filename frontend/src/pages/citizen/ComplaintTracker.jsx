import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";
import ComplaintCard from "../../components/ComplaintCard";

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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            My Complaints
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            All complaints you've reported, including
            ones merged with similar reports
          </p>
        </div>

        {loading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl
                                      shadow-sm p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded
                                w-1/3 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 py-8">
            {error}
          </p>
        )}

        {!loading && !error && complaints.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">
              No complaints submitted yet.
            </p>
            <a href="/submit"
               className="text-blue-600 text-sm mt-2
                          hover:underline block">
              Submit your first complaint →
            </a>
          </div>
        )}

        {!loading && !error && complaints.length > 0 && (
          <div className="flex flex-col gap-4">
            {complaints.map((complaint) => (
              <div key={complaint.id}>
                <ComplaintCard
                  complaint={{
                    ...complaint,
                    location: `${complaint.district} — ${complaint.area}`
                  }}
                />
                {complaint.report_count > 1 && (
                  <p className="text-xs text-gray-400 mt-1 ml-1">
                    This issue has been reported by{" "}
                    {complaint.report_count} citizens
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