import { useState } from "react";
import ComplaintCard from "../../components/ComplaintCard";

const PUDUCHERRY_DISTRICTS = [
  "Puducherry",
  "Karaikal",
  "Mahe",
  "Yanam"
];

const mockComplaints = [
  {
    id: "CP001",
    title: "Garbage not collected near market",
    category: "Sanitation",
    urgency: "High",
    status: "Pending",
    date: "2026-06-12",
    location: "Puducherry — Anna Nagar",
    description: "Garbage has not been collected for 5 days near the market area causing unhygienic conditions.",
    district: "Puducherry"
  },
  {
    id: "CP002",
    title: "Pothole on MG Road",
    category: "Roads",
    urgency: "Medium",
    status: "In Progress",
    date: "2026-06-13",
    location: "Karaikal — Main Street",
    description: "Large pothole on MG Road causing risk to two-wheelers especially during rain.",
    district: "Karaikal"
  },
  {
    id: "CP003",
    title: "Streetlight not working near bus stand",
    category: "Electrical",
    urgency: "Low",
    status: "Resolved",
    date: "2026-06-11",
    location: "Mahe — Bus Stand Road",
    description: "Streetlight near the main bus stand has been non-functional for a week.",
    district: "Mahe"
  },
  {
    id: "CP004",
    title: "Water leaking from pipeline",
    category: "Water",
    urgency: "High",
    status: "Pending",
    date: "2026-06-14",
    location: "Puducherry — Lawspet",
    description: "Underground pipeline leaking water continuously causing road damage and water waste.",
    district: "Puducherry"
  },
  {
    id: "CP005",
    title: "Sewage overflow near school",
    category: "Sanitation",
    urgency: "High",
    status: "In Progress",
    date: "2026-06-14",
    location: "Yanam — School Road",
    description: "Sewage overflowing near government school creating health hazard for children.",
    district: "Yanam"
  }
];

export default function PublicTracker() {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleSearch = () => {
    if (!searchId.trim()) return;
    const found = mockComplaints.find(
      (c) => c.id.toLowerCase() === searchId.trim().toLowerCase()
    );
    if (found) {
      setSearchResult(found);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const filteredComplaints = selectedDistrict
    ? mockComplaints.filter((c) => c.district === selectedDistrict)
    : mockComplaints;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            CivicPulse
          </h1>
          <p className="text-gray-500 mt-1">
            Public Complaint Tracker — Puducherry
          </p>
        </div>

        {/* Search by ID */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Track Your Complaint
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Complaint ID (e.g. CP001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg
                         px-4 py-2 focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2
                         rounded-lg hover:bg-blue-700 font-semibold"
            >
              Search
            </button>
          </div>

          {/* Search Result */}
          {searchResult && (
            <div className="mt-4">
              <ComplaintCard complaint={searchResult} />
            </div>
          )}

          {notFound && (
            <p className="mt-3 text-sm text-red-500">
              No complaint found with ID "{searchId}".
              Please check and try again.
            </p>
          )}
        </div>

        {/* District Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Browse by District
          </h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedDistrict("")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium
                ${selectedDistrict === ""
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              All
            </button>
            {PUDUCHERRY_DISTRICTS.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium
                  ${selectedDistrict === d
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Complaint List */}
        <div className="flex flex-col gap-4">
          {filteredComplaints.length === 0 ? (
            <p className="text-center text-gray-400 py-8">
              No complaints found for this district.
            </p>
          ) : (
            filteredComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}