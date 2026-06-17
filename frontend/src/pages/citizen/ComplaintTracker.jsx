import ComplaintCard from "../../components/ComplaintCard";

const mockComplaints = [
  {
    id: "CP001",
    title: "Garbage not collected near market",
    category: "Sanitation",
    urgency: "High",
    status: "Pending",
    date: "2026-06-12",
    location: "Puducherry — Anna Nagar",
    description: "Garbage has not been collected for 5 days."
  },
  {
    id: "CP002",
    title: "Pothole on MG Road",
    category: "Roads",
    urgency: "Medium",
    status: "In Progress",
    date: "2026-06-13",
    location: "Karaikal — Main Street",
    description: "Large pothole causing risk to two-wheelers."
  },
  {
    id: "CP003",
    title: "Streetlight not working",
    category: "Electrical",
    urgency: "Low",
    status: "Resolved",
    date: "2026-06-11",
    location: "Mahe — Bus Stand Road",
    description: "Streetlight non-functional for a week."
  }
];

export default function ComplaintTracker() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            My Complaints
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track all your submitted complaints
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {mockComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
            />
          ))}
        </div>

      </div>
    </div>
  );
}