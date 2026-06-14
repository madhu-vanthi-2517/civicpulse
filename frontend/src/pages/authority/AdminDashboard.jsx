import { useState } from 'react';
import mappingData from '../../department_mapping.json'; 

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([
    { id: "CP-1024", title: "Main Street Pothole", category: "pothole", urgency: "High", status: "Pending" },
    { id: "CP-1025", title: "Streetlight Broken near Park", category: "streetlight_broken", urgency: "Medium", status: "In Progress" },
    { id: "CP-1026", title: "Main water line burst near sector 4", category: "water_leakage", status: "Pending" }
  ]);

  // 1. Define the sidebar toggle state
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 text-slate-900 font-sans">
      
      {/* ==================== SIDEBAR WITH TOGGLE LOGIC ==================== */}
      {/* Dynamic width: w-16 when collapsed, w-64 when open. duration-300 makes it slide smoothly */}
      <aside className={`flex-shrink-0 bg-white border-r border-gray-200 p-4 flex flex-col gap-6 text-left transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        
        {/* Sidebar Header & Action Toggle Button */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 min-h-[40px]">
          {!isCollapsed && (
            <span className="text-xl font-bold tracking-tight text-gray-900 whitespace-nowrap animate-fadeIn">
              CivicPulse
            </span>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 font-mono text-sm tracking-tighter mx-auto border border-gray-200 shadow-2xs cursor-pointer"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? "▶" : "◀"}
          </button>
        </div>

        {/* Navigation Items Links */}
        <nav className="flex flex-col gap-1 flex-1">
          <button className={`w-full flex items-center gap-3 font-medium text-sm px-3 py-2.5 bg-indigo-50 text-indigo-700 rounded-lg ${
            isCollapsed ? 'justify-center' : 'text-left'
          }`}>
            <span className="text-base">📋</span>
            {!isCollapsed && <span className="whitespace-nowrap">Incidents Matrix</span>}
          </button>
        </nav>

        {/* System Status Node Footer */}
        <div className={`text-[10px] text-gray-400 border-t border-gray-100 pt-4 tracking-tight ${
          isCollapsed ? 'text-center' : 'text-left'
        }`}>
          {isCollapsed ? "🔒" : "Secured Authority Node"}
        </div>
      </aside>

      {/* ==================== MAIN CONTENT WRAPPER ==================== */}
      <main className="flex-1 min-w-0 p-8 overflow-y-auto text-left">
        <header className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Authority Command Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Puducherry Region Prototype Dashboard</p>
        </header>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Total Complaints</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{complaints.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
            <h3 className="text-sm font-medium text-amber-600 uppercase">Pending Review</h3>
            <p className="text-2xl font-bold text-amber-700 mt-2">
              {complaints.filter(c => c.status === "Pending").length}
            </p>
          </div>
        </div>

        {/* FIXED COMPLAINTS TABLE CONTAINER */}
        <div className="w-full bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-xs">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left tracking-wider">ID</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left tracking-wider">Complaint</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left tracking-wider">Category</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left tracking-wider">Assigned Department</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left tracking-wider">Urgency</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
              {complaints.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-indigo-600">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-xs font-mono text-gray-500">
                    <span className="bg-gray-100 rounded-md px-2 py-1">{item.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    {mappingData.categories[item.category] || "Unassigned Module"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.urgency === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.urgency || "Medium"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      • {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}