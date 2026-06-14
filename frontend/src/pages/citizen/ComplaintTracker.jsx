import ComplaintCard from "../../components/ComplaintCard";

const mockComplaints = [
  {
    id: "CP001",
    title: "Garbage Accumulation",
    category: "Sanitation",
    urgency: "High",
    status: "Pending",
    date: "2026-06-12",
    location: "Tiruppur, Ward 4"
  },
  {
    id: "CP002",
    title: "Pothole on MG Road",
    category: "Roads",
    urgency: "Medium",
    status: "In Progress",
    date: "2026-06-13",
    location: "Coimbatore, RS Puram"
  }
];

export default function ComplaintTracker() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          My Complaints
        </h2>

        <div className="flex flex-col gap-4">
          {mockComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              {...complaint}
            />
          ))}
        </div>

      </div>
    </div>
  );
}