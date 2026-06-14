import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie,
  Cell, Legend
} from 'recharts';

const categoryData = [
  { category: "Sanitation", count: 12 },
  { category: "Roads", count: 8 },
  { category: "Water", count: 6 },
  { category: "Electrical", count: 4 },
  { category: "Other", count: 2 }
];

const districtData = [
  { district: "Puducherry", count: 15 },
  { district: "Karaikal", count: 7 },
  { district: "Mahe", count: 4 },
  { district: "Yanam", count: 6 }
];

const statusData = [
  { name: "Pending", value: 14 },
  { name: "In Progress", value: 10 },
  { name: "Resolved", value: 8 }
];

const STATUS_COLORS = {
  Pending: "#F59E0B",
  "In Progress": "#3B82F6",
  Resolved: "#10B981"
};

export default function Analytics() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Puducherry Region — Complaint Intelligence Overview
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border 
                          border-gray-100 shadow-xs">
            <h3 className="text-xs font-medium text-gray-500 
                           uppercase tracking-wider">
              Total Complaints
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              32
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border 
                          border-gray-100 shadow-xs">
            <h3 className="text-xs font-medium text-amber-600 
                           uppercase tracking-wider">
              Pending
            </h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">
              14
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border 
                          border-gray-100 shadow-xs">
            <h3 className="text-xs font-medium text-emerald-600 
                           uppercase tracking-wider">
              Resolved
            </h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">
              8
            </p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Complaints by Category */}
          <div className="bg-white p-6 rounded-xl border 
                          border-gray-100 shadow-xs">
            <h2 className="text-sm font-semibold text-gray-700 
                           mb-4 uppercase tracking-wider">
              By Category
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" 
                               stroke="#F3F4F6" />
                <XAxis dataKey="category" 
                       tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366F1" 
                     radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Complaints by District */}
          <div className="bg-white p-6 rounded-xl border 
                          border-gray-100 shadow-xs">
            <h2 className="text-sm font-semibold text-gray-700 
                           mb-4 uppercase tracking-wider">
              By District
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" 
                               stroke="#F3F4F6" />
                <XAxis dataKey="district" 
                       tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0EA5E9" 
                     radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="bg-white p-6 rounded-xl border 
                        border-gray-100 shadow-xs">
          <h2 className="text-sm font-semibold text-gray-700 
                         mb-4 uppercase tracking-wider">
            Status Distribution
          </h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => 
                    `${name}: ${value}`}
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}