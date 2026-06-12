import { useState } from 'react';

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([
    { id: 1, title: "Main Street Pothole", category: "Roads", urgency: "High", status: "Pending" },
    { id: 2, title: "Streetlight Broken near Park", category: "Electrical", urgency: "Medium", status: "In Progress" }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-left">
      <header className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">CivicPulse · Authority Panel</h1>
        <p className="text-sm text-gray-500 mt-1">Puducherry Region Prototype Dashboard</p>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Complaints</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{complaints.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
          <h3 className="text-sm font-medium text-amber-600 uppercase">Pending Review</h3>
          <p className="text-2xl font-bold text-amber-700 mt-2">
            {complaints.filter(c => c.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left tracking-wider">Complaint</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left tracking-wider">Category</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left tracking-wider">Urgency</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.urgency === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.urgency}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}