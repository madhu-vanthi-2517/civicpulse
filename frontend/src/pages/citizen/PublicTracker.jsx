import { useState, useEffect } from "react";
import { api } from "../../api";
import ComplaintCard from "../../components/ComplaintCard";

const PUDUCHERRY_DISTRICTS = [
  "Puducherry", "Karaikal", "Mahe", "Yanam"
];

export default function PublicTracker() {
  const [complaints, setComplaints] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await api.getPublicComplaints(
          selectedDistrict
        );
        if (Array.isArray(data)) {
          setComplaints(data);
        }
      } catch (err) {
        console.error("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [selectedDistrict]);

  const handleSearch = () => {
    if (!searchId.trim()) return;
    const found = complaints.find(
      (c) => String(c.id) === searchId.trim() ||
             `CP${String(c.id).padStart(3,"0")}` ===
             searchId.trim().toUpperCase()
    );
    if (found) {
      setSearchResult(found);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            CivicPulse
          </h1>
          <p className="text-gray-500 mt-1">
            Public Complaint Tracker — Puducherry
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm
                        p-6 mb-6">
          <h2 className="text-lg font-semibold
                         text-gray-700 mb-3">
            Track Your Complaint
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Complaint ID (e.g. 1)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 border border-gray-300
                         rounded-lg px-4 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6
                         py-2 rounded-lg hover:bg-blue-700
                         font-semibold"
            >
              Search
            </button>
          </div>
          {searchResult && (
            <div className="mt-4">
              <ComplaintCard
                complaint={{
                  ...searchResult,
                  location: `${searchResult.district} — ${searchResult.area}`
                }}
              />
            </div>
          )}
          {notFound && (
            <p className="mt-3 text-sm text-red-500">
              No complaint found with that ID.
            </p>
          )}
        </div>

        {/* District Filter */}
        <div className="bg-white rounded-xl shadow-sm
                        p-6 mb-6">
          <h2 className="text-lg font-semibold
                         text-gray-700 mb-3">
            Browse by District
          </h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedDistrict("")}
              className={`px-4 py-1.5 rounded-full
                text-sm font-medium ${
                selectedDistrict === ""
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              All
            </button>
            {PUDUCHERRY_DISTRICTS.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-4 py-1.5 rounded-full
                  text-sm font-medium ${
                  selectedDistrict === d
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Complaint List */}
        {loading ? (
          <p className="text-center text-gray-400 py-8">
            Loading complaints...
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {complaints.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                No complaints found.
              </p>
            ) : (
              complaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={{
                    ...complaint,
                    location: `${complaint.district} — ${complaint.area}`
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}