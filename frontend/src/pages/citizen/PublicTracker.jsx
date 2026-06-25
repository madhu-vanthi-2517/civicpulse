import { useState, useEffect } from "react";
import { api } from "../../api";
import ComplaintCard from "../../components/ComplaintCard";
// 🌟 Added design search icons
import { Search, Map } from "lucide-react"; 

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
      setLoading(true);
      try {
        const data = await api.getPublicComplaints(selectedDistrict);
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
             `CP${String(c.id).padStart(3, "0")}` === searchId.trim().toUpperCase()
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

        {/* Tracker Page Header Title */}
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            CivicPulse
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            Public Complaint Tracker — Puducherry Territory
          </p>
        </div>

        {/* Search Segment Input Area */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 text-left">
          <h2 className="text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Search size={18} className="text-gray-400" />
            <span>Track Individual Ticket ID</span>
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Complaint ID (e.g. 1 or CP001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold text-sm transition shadow-sm"
            >
              Search
            </button>
          </div>
          {searchResult && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-xs font-bold text-emerald-600 mb-2 uppercase tracking-wider">Search Match Found:</p>
              <ComplaintCard
                complaint={{
                  ...searchResult,
                  location: `${searchResult.district} — ${searchResult.area}`
                }}
              />
            </div>
          )}
          {notFound && (
            <p className="mt-3 text-sm text-red-500 font-medium bg-red-50/50 p-2.5 rounded border border-red-100/50 w-fit">
              ⚠ No system complaint matched that identifier value.
            </p>
          )}
        </div>

        {/* District Filter Options Container Row */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 text-left">
          <h2 className="text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Map size={18} className="text-gray-400" />
            <span>Filter Jurisdiction Node</span>
          </h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedDistrict("")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition uppercase ${
                selectedDistrict === "" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Regions
            </button>
            {PUDUCHERRY_DISTRICTS.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition uppercase ${
                  selectedDistrict === d ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Main Feed Output Queue List */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {complaints.length === 0 ? (
              <p className="text-center text-gray-400 bg-white border border-gray-100 rounded-xl py-12">
                No active public complaints registered inside this node filter.
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